// ==========================
// Quantum Store
// register.js
// ==========================

const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("register-message");

registerForm.addEventListener("submit", function(e) {

    e.preventDefault();

    // Get form values
    const name = document.getElementById("register-name").value.trim();
    const username = document.getElementById("register-username").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-confirm-password").value;

    // Check passwords
    if (password !== confirmPassword) {

        registerMessage.textContent = "Passwords do not match.";
        registerMessage.style.color = "red";

        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const emailExists = users.some(user =>
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {

        registerMessage.textContent = "An account with this email already exists.";
        registerMessage.style.color = "red";

        return;
    }

    // Check if username already exists
    const usernameExists = users.some(user =>
        user.username.toLowerCase() === username.toLowerCase()
    );

    if (usernameExists) {

        registerMessage.textContent = "This username is already taken.";
        registerMessage.style.color = "red";

        return;
    }

    // Create new user
    const newUser = {

        name: name,
        username: username,
        email: email,
        password: password

    };

    // Add user to users array
    users.push(newUser);

    // Save users
    localStorage.setItem("users", JSON.stringify(users));

    // Success message
    registerMessage.textContent = "Account created successfully!";
    registerMessage.style.color = "green";

    // Clear form
    registerForm.reset();

    // Go to login after 1.5 seconds
    setTimeout(function() {

        window.location.href = "login.html";

    }, 1500);

});
