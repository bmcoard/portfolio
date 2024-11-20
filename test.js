console.log("running")
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CORS = require("cors");
const express = require("express"); //returns function from node module "express"
const app = express();
const path = require("path");
app.use(CORS()); //content origin resource sharing - gives permission to have domains access server
const PORT = process.env.PORT || 3003; //heroku
console.log("PORT= ", PORT)
app.listen(PORT, () => {
    console.log("server running on port 3003");
});
app.get("*", (request, response) => {
    response.send("hello world");
});