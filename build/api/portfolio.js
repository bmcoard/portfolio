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
const portfolioRouter = express.Router();
const Project = require("../models/project");
portfolioRouter.get("/projects", express.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield Project.find({}, { _id: 0, __v: 0 }); //find all records, ignore id and _v
    // const projects = [{
    //     "name":"Quiz",
    //     "codeLink":"https://github.com/bmcoard/Quiz-App",
    //     "technologies":["HTML/CSS", "Javascript", "ExpressJS", "NodeJS", "MongoDb"],
    //     "description":"User answers quiz questions stored in the backend Mongo Database. There is functionality to login to an account, create new questions, create new categories, and have answers graded",
    //     "imageLink": "images/quiz.png"
    // }]
    console.log(projects);
    res.status(200).json({ sucess: true, projects }); //json will send status
}));
module.exports = portfolioRouter;
