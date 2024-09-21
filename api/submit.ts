const express = require("express")
import {Request, Response} from "express"
const contactsRouter = express.Router()
const Contact = require("../models/contact")
const {sendEmail} = require("../services/nodemailer")


contactsRouter.post("/submit", express.json(), async (req:Request, res:Response) => {
    const sender = req.body.name
    const email = req.body.email
    const employer = req.body.employer
    const message = req.body.message
    sendEmail("bmcoard@gmail.com", `New contact from ${sender}`, "test message")
    
    const newContact = new Contact({
        userId: Math.floor(Date.now())/1000, //epoch 
        name: sender,
        email: email,
        employer: employer,
        message: message
    })

    console.log("Contact:" + newContact)
    
    await newContact.save()
    res.sendStatus(200) //sets status and sends it to client
    //res.status sets status and results in a pending response
})

module.exports = contactsRouter  //exports router to app.js 