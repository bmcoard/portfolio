//const mongoose = require("mongoose");
//const { Schema } = mongoose;

const projectSchema = new Schema({
    name: { type: String },
    codeLink: {type: String},
    technologies: { type: [String] },
    description: {type: String},
    imageLink: {type: String},
    ID: {type: String}
});

const Project = mongoose.model("Projects", projectSchema); //"Projects" is the name in the database
module.exports = Project;