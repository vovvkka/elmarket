const express = require('express');
const User = require("../models/User");
const auth = require("../middlewares/auth");
const permit = require("../middlewares/permit");
const router = express.Router();

router.get('/:id',auth,permit('admin'), async (req, res) => {
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
        const {username, email, phone, additionalPhone, city, street, house, flat} = user;
        res.send({username, email, phone, additionalPhone, city, street, house, flat});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', async (req, res) => {
    const {password, email, username} = req.body;

    try {
        const userData = {password, email, username};
        const user = new User(userData);

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.put('/', auth, async (req, res) => {
    const {username, email, phone, additionalPhone, city, street, house, flat} = req.body;

    try {
        const userData = {username, email, phone, additionalPhone, city, street, house, flat};
        const updated = await User.updateOne(req.user, userData);
        res.send(updated);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(401).send({error: 'Неправильный логин или пароль!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(401).send({error: 'Неправильный логин или пароль!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({message: 'Успешная авторизация!', user})
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

module.exports = router;