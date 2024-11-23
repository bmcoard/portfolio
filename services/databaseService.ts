function startDatabase(){
    const mongoose = require("mongoose")
    const databaseString = process.env.DEBUG == "true" ? process.env.DEV_MONGODB : process.env.PROD_MONGODB
    console.log("database string:",databaseString)
    mongoose.connect(databaseString)
    
    const database = mongoose.connection
    database.on("error", () => console.error("An error occured connecting to MongoDB")) //can fire multiple times
    database.once("open", () => {                                                  //only fires once. can only connect to database a single time
        console.log("Connected to MongoDB")
    })
}

module.exports = startDatabase
