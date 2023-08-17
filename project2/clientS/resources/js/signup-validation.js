const BASE_URL = 'http://localhost:3001';

window.onload = function () {
    const signupForm = document.getElementById("signupForm");
    const usernameInput = document.getElementById("signupUsername");
    const passwordInput = document.getElementById("signupPassword");
    const firstnameInput = document.getElementById("signupFirstName");

    const lastnameInput = document.getElementById("signupLastName");

    const userPasswordError = document.getElementById("userPasswordError");

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault()
        if (!isUsernameValid(usernameInput.value) || !isPasswordValid(passwordInput.value)) {
            userPasswordError.textContent = "Invalid Username or Password";

        }
        else {
            try {
                const response = await fetch(BASE_URL + '/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Additional headers if needed
                    },
                    body: JSON.stringify({
                        userId: usernameInput.value,
                        password: passwordInput.value,
                        firstname: firstnameInput.value,
                        lastname: lastnameInput.value,

                    })
                })

                console.log("response", response)
                window.location.href = "http://127.0.0.1:3000/project2/clientS/login.html";
            }
            catch (error) {
                console.log("Error during login", error)
            }

        }
    });

    function isUsernameValid(username) {
        return username.trim() !== "";
    }

    function isPasswordValid(password) {
        return password.length >= 8;

    }
};
