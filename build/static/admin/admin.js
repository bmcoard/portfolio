const contactsElement = document.getElementById("contacts")
const projectsElement = document.getElementById("projects")

const testContact = [{
    name: "brian",
    email: "chicken",
    employer: "yayaya",
    body: "ghghg"
}]

console.log("start of script")
const projectForm = document.getElementById("create")
console.log("proj form", projectForm)

projectForm.addEventListener("submit", handleCreateProject)
const addTechElement = document.getElementById("add-tech")
addTechElement.addEventListener("click", handleAddTechnology)
const addedTechElement = document.getElementById("added-technologies") //step 1: get div




createEmailTable()
createProjectTable()


async function handleAddTechnology(event){
    const techElement = document.createElement("div") //create div
    const inputTechElement = document.getElementById("technology")
    techElement.textContent = inputTechElement.value
    addedTechElement.appendChild(techElement)
    inputTechElement.value = ""
    getAddedTechnologies()
}

function getAddedTechnologies(){
    const addedTechnologies = []
    const techElementCollection = addedTechElement.children
    Array.from(techElementCollection).forEach(techElement => {addedTechnologies.push(techElement.textContent)}) //rename tech element
    console.log(addedTechnologies)
    return(addedTechnologies)
}


async function handleCreateProject(event) {
    event.preventDefault()    
    const formData = new FormData(event.target)
    const formDataJson = Object.fromEntries( formData )
    formDataJson.technologies = getAddedTechnologies()
    console.log(formDataJson)

    const response = await fetch("/api/admin/projects", {
        method: "POST", 
        //body: formData
        headers: {"content-type":"application/json"},
        body: JSON.stringify(formDataJson)
    })
    console.log(response)
    
    if( !response.ok ) {
        console.error( "Failed to create Project" );
        return;
    }

    createProjectTable() //todo: consider optimized way of adding new projects for performance
}

async function DeleteProject(project){
    const response = await fetch("/api/admin/projects", {
        method: "DELETE", 
        headers: {"content-type":"application/json"},
        body: JSON.stringify(project)
    })

    createProjectTable() //todo: consider optimized way of deleting projects for performance
}

async function createProjectTable(){
    const response = await fetch("/api/portfolio/projects")
    if( !response.ok ) {
        console.error( "Failed to retrieve projects from API" );
        return;
    }

    console.log("Response: ", response)
    const data = await response.json()
    const projects = data.projects

    createTable(projects, projectsElement)
}

async function createEmailTable(){
    const response = await fetch("/api/admin/emails")
    if( !response.ok ) {
        console.error( "Failed to retrieve emails from API" );
        return;
    }

    console.log("Response: ", response)
    const data = await response.json()
    const emails = data.emails

    createTable(emails, contactsElement)
}

function createTable(data, tableElement){
    if (data.length <= 0){
        console.warn("No data found for table element")
        return
    }

    tableElement.innerHTML = ""

    const headers = Object.keys(data[0])

    createTableHead(headers, tableElement)
    createTableBody(data, tableElement);
}


function createTableHead (headers, tableElement){
    const tableRowElement = document.createElement("tr")
    const tableHeadElement = document.createElement("thead")

    console.log("headers:", headers)

    headers.forEach(headerText => {
        if (headerText=="ID") return
        const tableHeaderElement = document.createElement("th");
        tableHeaderElement.textContent = headerText
        tableRowElement.appendChild(tableHeaderElement)
    })

    tableHeadElement.appendChild(tableRowElement)
    tableElement.appendChild(tableHeadElement)
}


function createTableBody(data, tableElement) {
    const tableBodyElement = document.createElement("tbody");

    console.log("data:", data)

    data.forEach(item => {
        const tableRowElement = document.createElement("tr");
        
        const columnNames = Object.keys(item)
        console.log("column names:", columnNames)
        columnNames.forEach(column =>{
            if (column == "ID") return //for callback functions, return skips iterations instead of ending it
            const columnData = document.createElement("td")
            columnData.textContent = item[column]
            tableRowElement.appendChild(columnData)
        })

        const columnData = document.createElement("td")
        columnData.textContent = "x"
        columnData.addEventListener("click", (event) => DeleteProject(item))
        tableRowElement.appendChild(columnData)

        tableBodyElement.appendChild(tableRowElement)
    })
    tableElement.appendChild(tableBodyElement);
}

