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
                location.href = "login.html";
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

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // const username = usernameInput.value;
        // const password = passwordInput.value;
        // const firstname = firstnameInput.value;
        // const lastname = lastnameInput.value;

        if (!isUsernameValid(username) || !isPasswordValid(password)) {
            userPasswordError.textContent = "Invalid Username or Password";
        } else {
            try {
                const response = await fetch(`${BASE_URL}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Additional headers if needed
                    },
                    body: JSON.stringify({
                        userId: username,
                        password,
                        firstname,
                        lastname,
                    }),
                });

                if (response.status === 404) {
                    console.log('response status', res.status)
                    const result = await response.json();
                    document.getElementById('uniqueUname').innerText = result.error;
                } else {
                    location.href = 'login.html';
                }
            } catch (error) {
                console.log("Error during signup", error);
            }
        }
    });


};
