document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const usernameInput = document.getElementById("signupUsername");
    // const usernameMessage = document.getElementById("usernameMessage");
    const passwordInput = document.getElementById("signupPassword");
    const userPasswordError = document.getElementById("userPasswordError"); // Correct variable name

    signupForm.addEventListener("submit", function (event) {
        if (!isUsernameValid(usernameInput.value) || !isPasswordValid(passwordInput.value)) {
            userPasswordError.textContent = "Invalid Username or Password"; // Use textContent to set the error message
            event.preventDefault();
            // Display error message or handle validation feedback
        }
    });

    function isUsernameValid(username) {
        return username.trim() !== ""; // Check if not empty
    }

    function isPasswordValid(password) {
        return password.length >= 8; // Check password length
    }
});
