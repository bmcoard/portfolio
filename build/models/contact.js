"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;
const contactSchema = new Schema({
    contactId: { type: Number }, // defines properties of field userId
    name: { type: String },
    email: { type: String },
    employer: { type: String },
    body: { type: String }
});
const Contact = mongoose.model("Contacts", contactSchema); //User is the name of the table
module.exports = Contact;
