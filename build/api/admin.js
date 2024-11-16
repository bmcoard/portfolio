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
const Contact = require("../models/contact");
const Project = require("../models/project");
const { uniqueID } = require("../utilities/helpers");
const adminRouter = express.Router();
adminRouter.use(express.urlencoded({ extended: true }));
// const {verifyUser} = require("../middlewares/user") //destructure
adminRouter.get("/emails", express.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emails = yield Contact.find({}, { _id: 0, __v: 0 }); //find all records, ignore id and _v
    res.status(200).json({ sucess: true, emails }); //json will send status
}));
//URL encoded is used for url requests and html forms decodes characters not used in url
adminRouter.post("/projects", express.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = new Project({
        name: req.body.title,
        codeLink: req.body.link,
        technologies: req.body.technologies,
        description: req.body.description,
        imageLink: req.body.image,
        ID: uniqueID()
    });
    yield project.save();
    res.status(200).json({ sucess: true });
}));
adminRouter.delete("/projects", express.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Project.deleteOne({ ID: req.body.ID });
    res.status(200).json({ sucess: true });
}));
module.exports = adminRouter;
