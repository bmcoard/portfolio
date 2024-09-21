
const quiz = document.getElementById("quiz")
const portfolio = document.getElementById("portfolio")
const todoList = document.getElementById("to do list")
//const submit = document.getElementById("submit")

// document.getElementById("portfolio-container").style.display="none"
// quiz.addEventListener("click", (event) => select(quiz))
// portfolio.addEventListener("click", (event) => select(portfolio))
// todoList.addEventListener("click", (event) => select(todoList))
document.getElementById("submit").addEventListener("click", (event) => addContact())
// document.getElementById("login").addEventListener("click", (event) => login())

// async function login(){    
//     const username = document.getElementById("username").value
//     const response = await fetch("/api/login", { //  /login?
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({username}) 
//     })

//     if( !response.ok ) {
//         console.error( "Error logging in user" );
//         return;
//     }
    
//     else{
//         document.getElementById("portfolio-container").style.display="block"
//     }
// }

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