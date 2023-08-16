window.onload = function () {
    const signupForm = document.getElementById("signupForm");
    const usernameInput = document.getElementById("signupUsername");
    const passwordInput = document.getElementById("signupPassword");
    const userPasswordError = document.getElementById("userPasswordError");

    signupForm.addEventListener("submit", function (event) {
        if (!isUsernameValid(usernameInput.value) || !isPasswordValid(passwordInput.value)) {
            userPasswordError.textContent = "Invalid Username or Password";
            event.preventDefault();
           // preventDefault() prevents function from doing what it is supposed to do
        }
    });

    function isUsernameValid(username) {
        return username.trim() !== "";
    }

    function isPasswordValid(password) {
        return password.length >= 8;
    }
};
