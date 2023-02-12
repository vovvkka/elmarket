const express = require('express');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const Product = require('../models/Product');
const transporter = require("../service/transporter");
const jwt = require('jsonwebtoken');
const {nanoid} = require("nanoid");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.get('/watchlist', auth, async (req, res) => {
    try {
        const user = await User.findOne(req.user).populate({
            path: 'history',
            select: 'title price inStock image discount',
        });
        res.send(user.history);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.get('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findOne(req.user);
        const {
            username,
            email,
            isActivated,
            phone,
            additionalPhone,
            city,
            street,
            house,
            flat,
        } = user;

        res.send({
            username,
            email,
            isActivated,
            phone,
            additionalPhone,
            city,
            street,
            house,
            flat,
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', async (req, res) => {
    const {password, email, username} = req.body;

    try {
        let userData = {password, email, username, activationLink: nanoid(30)};

        const user = new User(userData);

        user.generateToken();
        await user.save();

        transporter.sendActivationLink(email, userData.activationLink);

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/activate/:link', async (req, res) => {
    try {
        const activationLink = req.params.link;

        const user = await User.findOne({activationLink});

        if (!user) {
            return res.status(404).send("Неккоретная ссылка активации");
        }

        user.isActivated = true;
        await user.save({validateBeforeSave: false});

        return res.redirect(process.env.CLIENT_URL + `/${user._id}/activated`);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/resend-activationLink', async (req) => {
    const {email, activationLink} = req.body;
    transporter.sendActivationLink(email, activationLink);
});


router.put('/', auth, async (req, res) => {
    const {
        username,
        email,
        phone,
        additionalPhone,
    } = req.body;

    try {
        const userData = {
            username,
            email,
            phone,
            additionalPhone,
        };

        const updated = await User.updateOne(req.user, userData);
        res.send(updated);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/history', auth, async (req, res) => {
    const {product} = req.body;

    try {
        const productInfo = await Product.findById(product);
        const updated = await User.findOneAndUpdate(
            {_id: req.user._id},
            {
                $set: {
                    history: [
                        productInfo._id,
                        ...req.user.history
                            .filter(
                                (id) =>
                                    id.toString() !== productInfo._id.toString()
                            )
                            .slice(0, 3),
                    ],
                },
            }
        );

        res.send(updated);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res
            .status(401)
            .send({error: 'Неправильный логин или пароль!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res
            .status(401)
            .send({error: 'Неправильный логин или пароль!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({message: 'Успешная авторизация!', user});
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({success, user});
});

router.post('/forgot-password', async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return res
                .status(404)
                .send({message: 'Пользователь с данной почтой не найден.'});
        }

        const secret = JWT_SECRET + user.password;

        const payload = {
            email: user.email,
            id: user._id,
        };

        const token = jwt.sign(payload, secret, {expiresIn: '10m'});

        transporter.sendResetPasswordLink(user._id, token, email);

        res.send('Ссылка для сброса пароля была отправлена на почту: ' + email);
    } catch (e) {
        res.status(401).send(e);
    }
});

router.post('/reset-password/:id/:token', async (req, res) => {
    const {id, token} = req.params;
    const {password, password1} = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({error: 'Пользователь не найден.'});
        }

        if (password !== password1) {
            return res.status(400).send({message: 'Пароли не совпадают!'});
        }

        const secret = JWT_SECRET + user.password;

        jwt.verify(token, secret);

        user.password = password;
        await user.save({validateBeforeSave: false});

        res.send({message: 'Пароль успешно изменен!'});
    } catch (e) {
        res.status(404).send(e);
    }
});

router.put('/change-password', auth, async (req, res) => {
    const {currentPassword, newPassword, newPassword2} = req.body;

    if (newPassword !== newPassword2) {
        return res.status(400).send({error: 'Пароли не совпадают!'});
    }

    try {
        const user = await User.findOne(req.user);
        const isMatch = await user.checkPassword(currentPassword);

        if (!isMatch) {
            return res
                .status(401)
                .send({error: 'Неправильный старый пароль!'});
        }

        user.password = newPassword;
        await user.save({validateBeforeSave: false});
        res.send({message: 'Пароль успешно изменен!'});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
