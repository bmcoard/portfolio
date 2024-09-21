const express = require("express")
const Contact = require("../models/contact")
const adminRouter = express.Router()
import {Request, Response} from "express"

// const {verifyUser} = require("../middlewares/user") //destructure

adminRouter.get("/emails", express.json(), async (req: Request, res:Response) => {
    const emails = await Contact.find({},{_id:0, __v:0}) //find all records, ignore id and _v
    
    console.log(emails)
    res.status(200).json({sucess: true, emails}) //json will send status
})

module.exports = adminRouter