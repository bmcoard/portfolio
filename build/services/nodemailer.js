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
require("dotenv").config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bmcoard@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});
function sendEmail(recipient, subject, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: '"Brian Coard" bmcoard@gmail.com', // sender address
            to: recipient, // list of receivers
            subject: subject, // Subject line
            text: body // plain text body
        };
        console.log("Sending: ", mailOptions);
        const info = yield transporter.sendMail(mailOptions);
        console.log("Sent: ", info);
        return info;
    });
}
module.exports = { sendEmail };
