const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitSchema = new Schema({
    visits: {
        type: Number,
        required: true
    },
});

const Visit = mongoose.model('Visit', VisitSchema);

module.exports = Visit;
