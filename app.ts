const startDatabase = require("./services/databaseService")
const contactsRouter = require("./api/submit");
const adminRouter = require("./api/admin");
const {sendEmail} = require("./services/nodemailer")
const CORS = require("cors")


const express = require("express"); //returns function from node module "express"
import {Request, Response} from "express"
const app = express();
const path = require("path");

startDatabase()
app.use(CORS());
app.use("/api", contactsRouter);
app.use("/api/admin", adminRouter);


app.listen(3003, () => {
    console.log("server running on port 3003");
});

const staticDirectory = path.join(__dirname, "static");
app.use(express.static(staticDirectory));
app.get("/admin", (request:Request, response:Response) => {
    response.sendFile(path.join(staticDirectory, "admin.html"));
});

app.get("*", (request:Request, response:Response) => {
    response.sendFile(path.join(staticDirectory, "index.html"));
});

