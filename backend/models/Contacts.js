const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
    phone: [{ type: String, required: true }],
    email: [{ type: String, required: true }],
    instagramLink: String,
});

const Contacts = mongoose.model('Contacts', ContactsSchema);

module.exports = Contacts;
