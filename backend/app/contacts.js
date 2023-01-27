const express = require('express');
const Contacts = require('../models/Contacts');
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
        const { phone, email, instagramLink } = req.body;
        if (!phone || !email) {
            return res.status(400).send({ message: 'Data not valid!' });
        }

        const contactsData = {
            phone,
            email,
            instagramLink: instagramLink || '',
        };

        if (instagramLink){
            contactsData.instagramLink = instagramLink;
        }

        const contacts = await Contacts.findOneAndUpdate({}, contactsData);
        res.send(contacts);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
