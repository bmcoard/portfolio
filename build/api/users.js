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
const usersRouter = express.Router();
const { verifyUser } = require("../middlewares/user"); //destructure
const User = require("../models/user");
usersRouter.post("/login", express.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    res.cookie("loggedIn", username, { maxAge: 600000 }); //sets cookie
    res.sendStatus(200);
}));
usersRouter.post("/users", express.json(), verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User({
        userId: Math.floor(Date.now()) / 1000, //epoch 
        username: req.body.username
    });
    yield newUser.save();
    res.sendStatus(200); //sets status and sends it to client
    //res.status sets status and results in a pending response
}));
usersRouter.post("/logout", express.json(), verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("loggedIn");
    res.sendStatus(200);
}));
module.exports = usersRouter; //exports router to app.js
