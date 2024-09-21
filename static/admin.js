const contacts = document.getElementById("contacts")

const testContact = [{
    name: "brian",
    email: "chicken",
    employer: "yayaya",
    body: "ghghg"
}]

createEmailTable()

async function createEmailTable(){
    const response = await fetch("/api/admin/emails")
    if( !response.ok ) {
        console.error( "Failed to retrieve emails from API" );
        return;
    }

    console.log("Response: ", response)
    const data = await response.json()
    const emails = data.emails

    createTable(emails, contacts)
}

function createTable(data, tableElement){
    if (data.length <= 0){
        console.warn("No data found for table element")
        return
    }

    const headers = Object.keys(data[0])

    createTableHead(headers, tableElement)
    createTableBody(data, tableElement);
}


function createTableHead (headers, tableElement){
    const tableRowElement = document.createElement("tr")
    const tableHeadElement = document.createElement("thead")

    headers.forEach(headerText => {
        const tableHeaderElement = document.createElement("th");
        tableHeaderElement.textContent = headerText
        tableRowElement.appendChild(tableHeaderElement)
    })

    tableHeadElement.appendChild(tableRowElement)
    tableElement.appendChild(tableHeadElement)
}


function createTableBody(data, tableElement) {
    const tableBodyElement = document.createElement("tbody");

    data.forEach(item => {
        const tableRowElement = document.createElement("tr");
        
        const columnNames = Object.keys(item)
        columnNames.forEach(column =>{
            const columnData = document.createElement("td")
            columnData.textContent = item[column]
            tableRowElement.appendChild(columnData)
        })

        tableBodyElement.appendChild(tableRowElement)
    })
    tableElement.appendChild(tableBodyElement);
}

