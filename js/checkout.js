// ==========================
// Quantum Store
// checkout.js
// ==========================

const checkoutTotal = document.getElementById("checkout-total");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(product => {

    total += product.price * product.quantity;

});

const tax = total * 0.10;

const finalTotal = total + tax;

checkoutTotal.textContent = finalTotal.toFixed(2);
// ==========================
// PLACE ORDER
// ==========================

const placeOrderBtn = document.getElementById("place-order");

placeOrderBtn.addEventListener("click", function(){

    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const country = document.getElementById("country").value.trim();
    const zip = document.getElementById("zip").value.trim();

    if(
        fullName === "" ||
        email === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        country === "" ||
        zip === ""
    ){

        alert("Please fill in all required fields.");

        return;

    }

    alert("🎉 Thank you! Your order has been placed successfully.");

localStorage.removeItem("cart");

setTimeout(() => {

    window.location.href = "index.html";

}, 1500);

});
// ==========================
// LOGIN STATUS
// ==========================

function updateLoginStatus() {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    const loginLink =
        document.getElementById("login-link");

    const registerLink =
        document.getElementById("register-link");

    const userWelcome =
        document.getElementById("user-welcome");

    const logoutLink =
        document.getElementById("logout-link");


    if (currentUser) {

        if (loginLink) {
            loginLink.style.display = "none";
        }

        if (registerLink) {
            registerLink.style.display = "none";
        }

        if (userWelcome) {

            userWelcome.textContent =
                "Hello, " + currentUser.username;

            userWelcome.style.display = "inline";
        }

        if (logoutLink) {
            logoutLink.style.display = "inline";
        }

    } else {

        if (loginLink) {
            loginLink.style.display = "inline";
        }

        if (registerLink) {
            registerLink.style.display = "inline";
        }

        if (userWelcome) {
            userWelcome.style.display = "none";
        }

        if (logoutLink) {
            logoutLink.style.display = "none";
        }

    }

}

updateLoginStatus();


// ==========================
// LOGOUT
// ==========================

document.addEventListener("click", function(e) {

    if (e.target.id === "logout-link") {

        e.preventDefault();

        localStorage.removeItem("currentUser");

        window.location.href = "index.html";

    }

});