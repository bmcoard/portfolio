"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startDatabase = require("./services/databaseService");
const contactsRouter = require("./api/submit");
const { sendEmail } = require("./services/nodemailer");
const express = require("express"); //returns function from node module "express"
const app = express();
const path = require("path");
startDatabase();
app.use("/api", contactsRouter);
app.listen(3003, () => {
    console.log("server running on port 3003");
});
const staticDirectory = path.join(__dirname, "static");
app.use(express.static(staticDirectory));
app.get("*", (request, response) => {
    response.sendFile(path.join(staticDirectory, "index.html"));
});
