const express = require("express")
const portfolioRouter = express.Router()
const Project = require("../models/project")
import {Request, Response} from "express"


portfolioRouter.get("/projects", express.json(), async (req: Request, res:Response) => {
    const projects = await Project.find({},{_id:0, __v:0}) //find all records, ignore id and _v
    
    // const projects = [{
    //     "name":"Quiz",
    //     "codeLink":"https://github.com/bmcoard/Quiz-App",
    //     "technologies":["HTML/CSS", "Javascript", "ExpressJS", "NodeJS", "MongoDb"],
    //     "description":"User answers quiz questions stored in the backend Mongo Database. There is functionality to login to an account, create new questions, create new categories, and have answers graded",
    //     "imageLink": "images/quiz.png"
    // }]

    console.log(projects)
    res.status(200).json({sucess: true, projects}) //json will send status
})

module.exports = portfolioRouter