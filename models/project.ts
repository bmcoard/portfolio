// const mongoose = require("mongoose");
// const { Schema } = mongoose;

//fixed errors with namespaces.. google search

namespace ProjectFile {
    export const mongoose = require("mongoose");
    export const { Schema } = ProjectFile.mongoose;
}



const projectSchema = new ProjectFile.Schema({
    name: { type: String },
    codeLink: {type: String},
    technologies: { type: [String] },
    description: {type: String},
    imageLink: {type: String},
    ID: {type: String}
});

const Project = ProjectFile.mongoose.model("Projects", projectSchema); //"Projects" is the name in the database
module.exports = Project;