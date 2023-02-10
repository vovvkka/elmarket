const express = require('express');
const Visit = require('../models/Visit');
const permit = require("../middlewares/permit");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get('/', auth, permit("admin"),async (req, res) => {
    try {
        const visits = await Visit.findOne();
        res.send(visits);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const visits = await Visit.findOne();

        await Visit.findOneAndUpdate({}, {visits: visits.visits + 1});
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
