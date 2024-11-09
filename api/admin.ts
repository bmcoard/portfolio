const express = require("express")
const Contact = require("../models/contact")
const Project = require("../models/project")
const {uniqueID} = require ("../utilities/helpers")
const adminRouter = express.Router()
import {Request, Response} from "express"
adminRouter.use(express.urlencoded({extended:true}))

// const {verifyUser} = require("../middlewares/user") //destructure

adminRouter.get("/emails", express.json(), async (req: Request, res:Response) => {
    const emails = await Contact.find({},{_id:0, __v:0}) //find all records, ignore id and _v
    res.status(200).json({sucess: true, emails}) //json will send status
})

//URL encoded is used for url requests and html forms decodes characters not used in url
adminRouter.post("/projects", express.json(), async (req: Request, res:Response) => {
    const project = new Project({
        name: req.body.title, 
        codeLink: req.body.link,
        technologies: req.body.technologies,
        description: req.body.description,
        imageLink: req.body.image, 
        ID: uniqueID()
    })

    await project.save()
    res.status(200).json({sucess: true})
})

adminRouter.delete("/projects", express.json(), async (req: Request, res:Response) => {
    await Project.deleteOne({ID: req.body.ID})
    res.status(200).json({sucess: true})
})

module.exports = adminRouter