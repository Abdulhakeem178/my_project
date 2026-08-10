// ==========================
// Quantum Store
// app.js
// ==========================

const productGrid = document.querySelector(".product-grid");
let allProducts = [];

async function loadProducts() {

    try {

        const response = await fetch("../data/products.json");

        const products = await response.json();
        allProducts = products;

        displayProducts(products);

    } catch (error) {

        console.error("Error loading products:", error);

    }

}

function displayProducts(products) {

    productGrid.innerHTML = "";

    products.forEach(product => {

        productGrid.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <small>${product.category}</small>

                <h3>${product.name}</h3>

                <p>⭐ ${product.rating}</p>

                <h2>$${product.price}</h2>

      <button
    class="add-cart"
    data-id="${product.id}"
>
    Add To Cart
</button>

            </div>

        </div>

        `;

    });

}
document.addEventListener("click", function(e){

    if(e.target.classList.contains("add-cart")){

        const id = Number(e.target.dataset.id);

        addToCart(id);

        console.log("Added product ID:", id);

    }

});

loadProducts();

// =============================
// HERO SLIDER
// =============================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

function previousSlide(){

    currentSlide--;

    if(currentSlide < 0){

        currentSlide = slides.length - 1;

    }

    showSlide(currentSlide);

}

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", previousSlide);
// Clickable dots
dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentSlide = index;

        showSlide(currentSlide);

    });

});
setInterval(nextSlide,5000);
// =============================
// LIVE SEARCH
// =============================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    console.log("Searching:", searchInput.value);

    const keyword = searchInput.value.toLowerCase();

    const filteredProducts = allProducts.filter(product => {

    return (
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
    );

});

console.log(filteredProducts);

displayProducts(filteredProducts);

// Scroll to products
document.querySelector(".products").scrollIntoView({
    behavior: "smooth"
});

});
// =============================
// ADD TO CART
// =============================

function addToCart(id){

    const product = allProducts.find(item => item.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item => item.id === id);

    if(existingProduct){

        existingProduct.quantity++;

    }else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

}
// =============================
// UPDATE CART COUNT
// =============================

function updateCartCount(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((sum, product) => {

        return sum + product.quantity;

    }, 0);

    const cartCount = document.querySelector(".cart-count");

    if(cartCount){

        cartCount.textContent = totalItems;

    }

}

// Show the correct cart count when the page loads
updateCartCount();
// =============================
// LOGIN STATUS
// =============================

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

        // Hide Login and Register
        if (loginLink) {
            loginLink.style.display = "none";
        }

        if (registerLink) {
            registerLink.style.display = "none";
        }


        // Show username
        if (userWelcome) {

            userWelcome.textContent =
                "Hello, " + currentUser.username;

            userWelcome.style.display = "inline";
        }


        // Show Logout
        if (logoutLink) {
            logoutLink.style.display = "inline";
        }

    } else {

        // Show Login and Register
        if (loginLink) {
            loginLink.style.display = "inline";
        }

        if (registerLink) {
            registerLink.style.display = "inline";
        }


        // Hide username
        if (userWelcome) {
            userWelcome.style.display = "none";
        }


        // Hide Logout
        if (logoutLink) {
            logoutLink.style.display = "none";
        }

    }

}


// Run when page loads
updateLoginStatus();


// =============================
// LOGOUT
// =============================

document.addEventListener("click", function(e) {

    if (e.target.id === "logout-link") {

        e.preventDefault();

        localStorage.removeItem("currentUser");

        updateLoginStatus();

        window.location.href = "index.html";

    }

});