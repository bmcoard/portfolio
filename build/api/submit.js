"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const contactsRouter = express.Router();
const Contact = require("../models/contact");
const { sendEmail } = require("../services/nodemailer");
contactsRouter.post("/submit", express.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = req.body.name;
    const email = req.body.email;
    const employer = req.body.employer;
    const message = req.body.message;
    sendEmail("bmcoard@gmail.com", `New contact from ${sender}`, "test message");
    const newContact = new Contact({
        userId: Math.floor(Date.now()) / 1000, //epoch 
        name: sender,
        email: email,
        employer: employer,
        message: message
    });
    console.log("Contact:" + newContact);
    yield newContact.save();
    res.sendStatus(200); //sets status and sends it to client
    //res.status sets status and results in a pending response
}));
module.exports = contactsRouter; //exports router to app.js 
