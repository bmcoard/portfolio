"use strict";
// const mongoose = require("mongoose");
// const { Schema } = mongoose;
//fixed errors with namespaces.. google search
var ProjectFile;
(function (ProjectFile) {
    ProjectFile.mongoose = require("mongoose");
    ProjectFile.Schema = ProjectFile.mongoose.Schema;
})(ProjectFile || (ProjectFile = {}));
const projectSchema = new ProjectFile.Schema({
    name: { type: String },
    codeLink: { type: String },
    technologies: { type: [String] },
    description: { type: String },
    imageLink: { type: String },
    ID: { type: String }
});
const Project = ProjectFile.mongoose.model("Projects", projectSchema); //"Projects" is the name in the database
module.exports = Project;
