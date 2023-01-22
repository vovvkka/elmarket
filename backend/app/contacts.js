const express = require('express');
const Contacts = require("../models/Contacts");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const contacts = await Contacts.find();
        res.send(contacts[0]);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/', async (req, res) => {
    try {
        const {phone, email, instagramLink} = req.body;
        const contacts = await Contacts.findOneAndUpdate({}, {phone, email, instagramLink});
        res.send(contacts);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;
