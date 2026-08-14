// ==========================
// Quantum Store
// login.js
// ==========================

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("login-message");

loginForm.addEventListener("submit", function(e) {

    e.preventDefault();

    // Get login information
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    // Get registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching account
    const user = users.find(user =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    // Check login
    if (user) {

        // Save currently logged-in user
        localStorage.setItem("currentUser", JSON.stringify(user));

        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";

        // Go to home page
        setTimeout(function() {

            window.location.href = "index.html";

        }, 1000);

    } else {

        loginMessage.textContent =
            "Incorrect email or password.";

        loginMessage.style.color = "red";

    }

});
