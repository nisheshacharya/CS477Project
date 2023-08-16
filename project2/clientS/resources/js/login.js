const BASE_URL = 'http://localhost:3000';

const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");

loginForm.addEventListener("submit", function (event) {
    console.log("in login event")
    event.preventDefault();
    // const token = fetch(BASE_URL + '/login', {
    //     method: 'POST',
    //     mode: "no-cors",
    //     body: JSON.stringify({
    //         userId: username.value,
    //         password: password.value,
    //     })
    // })

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJOaXNlc2hfQWNoYXJ5YSIsImlhdCI6MTUxNjIzOTAyMn0.SJ_XeJ6Xn4rgxN9MXlfWVwQpuHi49OeOZn0g-DoUrDo";
    
});