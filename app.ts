const startDatabase = require("./services/databaseService")
const contactsRouter = require("./api/submit");
const adminRouter = require("./api/admin");
const portfolioRouter = require("./api/portfolio")
const {sendEmail} = require("./services/nodemailer")
const CORS = require("cors")


const express = require("express"); //returns function from node module "express"
import {Request, Response} from "express"
const app = express();
const path = require("path");

app.use(CORS()); //content origin resource sharing - gives permission to have domains access server
app.use("/api", contactsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/portfolio", portfolioRouter)

async function startApp() {
    await startDatabase()
    const PORT = process.env.PORT || 3003 //heroku
    
    app.listen(PORT, () => {
        console.log("server running on port 3003");
    });
}

startApp()

const staticDirectory = path.join(__dirname, "static");
app.use(express.static(staticDirectory));
app.get("/admin", (request:Request, response:Response) => {
    response.sendFile(path.join(staticDirectory, "/admin/admin.html"));
});

app.get("*", (request:Request, response:Response) => {
    response.sendFile(path.join(staticDirectory, "index.html"));
});

