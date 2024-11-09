
const quiz = document.getElementById("quiz")
const portfolio = document.getElementById("portfolio")
const projectsElement = document.getElementById("projects")

document.getElementById("submit").addEventListener("click", (event) => addContact())

const projectsData = [{
    "name":"Quiz",
    "codeLink":"https://github.com/bmcoard/Quiz-App",
    "technologies":["HTML/CSS", "Javascript", "ExpressJS", "NodeJS", "MongoDb"],
    "description":"User answers quiz questions stored in the backend Mongo Database. There is functionality to login to an account, create new questions, create new categories, and have answers graded",
    "imageLink": "images/quiz.png"
}]

// const projectsData2 [{}]
// <div class="project">
//   <a href = "https://github.com/bmcoard/Quiz-App">Portfolio</a> 
//   <div class="technologies">
//     <h3>Technologies</h3>
//     <ul>
//         <li>HTML/CSS</li>
//         <li>Javascript</li>
//         <li>ExpressJS</li>
//         <li>NodeJS</li>
//         <li>MongoDb</li>
//     </ul>
//   </div>
//   <p>Webpage presents programming projects I have completed, and my personal details. Functionality for sending email, accessing Github, and admin features</p>
//   <img src = "images/quiz.png"/>
// </div>
// -->
getProjects()

async function getProjects(){
    const response = await fetch("/api/portfolio/projects")

    if( !response.ok ) {
        console.error( "Error retrieving project" );
        return;
    }
    
    const data = await response.json()
    updateProjectsDiv(data.projects)
}


async function addContact(){
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const employer = document.getElementById("employer").value
    const body = document.getElementById("body").value
  
    const response = await fetch("/api/submit", { //  /login?
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, employer, body}) 
    })

    if( !response.ok ) {
        console.error( "Error submitting form" );
        return;
    }
    
    else{
        document.getElementById("msg").textContent = "Submitted"
    }
}


function updateProjectsDiv(projectsData){
    projectsData.forEach((project) =>{
        const projectDiv = createProjectDiv(project)
        projectsElement.appendChild(projectDiv)
    })
}

function createProjectDiv(projectData){
    const projectDivElement = document.createElement("div")
    const projectLinkElement = document.createElement("a")
    const projectParagraphElement = document.createElement("p")   
    const projectImgElement = document.createElement("img")
    projectDivElement.classList.add("project")

    projectLinkElement.href = projectData.codeLink
    projectLinkElement.textContent = projectData.name
    projectParagraphElement.textContent = projectData.description
    projectImgElement.src = projectData.imageLink

    const projectTechElement = createTechDiv(projectData.technologies)

    projectDivElement.appendChild(projectLinkElement)
    projectDivElement.appendChild(projectTechElement)
    projectDivElement.appendChild(projectParagraphElement)
    projectDivElement.appendChild(projectImgElement)

    console.log("projectDivElement:" + projectDivElement)
    return projectDivElement
}

function createTechDiv(projectTech){
    const projectTechElement = document.createElement("div")
    const projectTechHeaderElement = document.createElement("h3")
    const projectTechListElement = document.createElement("ul")
    projectTechElement.classList.add("technologies")

    projectTechHeaderElement.textContent = "Technologies"
    projectTechElement.appendChild(projectTechHeaderElement)


    projectTech.forEach((tech) => {
        const techItem = document.createElement("li")
        techItem.textContent = tech
        projectTechListElement.appendChild(techItem)
    })

    projectTechElement.appendChild(projectTechListElement)

    return projectTechElement
}

