const BASE_URL = 'http://localhost:3001';

const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const error = document.getElementById("loginError");


loginForm.addEventListener("submit", async function (event) {
    console.log("in login event")
    event.preventDefault();

    try {
        const response = await fetch(BASE_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Additional headers if needed
            },
            body: JSON.stringify({
                userId: username.value,
                password: password.value,
            })
        })

        console.log("response", response)
        if (response.status === 401) {
            // Handle unauthorized error
            error.innerHTML = "Login Failed"
            // You might want to redirect to a login page or take other actions
        } else {
            const token = await response.json();
            console.log("token", token)

            localStorage.setItem("token", token.token)

            window.location.href = "http://127.0.0.1:3000/project2/clientS/home.html";

        }

    }
    catch (error) {
        error.textContent = "Login Failed"
        console.log("Error during login", error)
    }


});