// ==========================
// Quantum Store
// cart.js
// ==========================

const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.getElementById("cart-total");
const itemsTotal = document.getElementById("items-total");
const taxTotal = document.getElementById("tax-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price * product.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${product.image}" alt="${product.name}">

                <div class="cart-info">

    <h3>${product.name}</h3>

    <p>${product.category}</p>

   <div class="quantity-controls">

    <button class="decrease-btn" data-index="${index}">
        -
    </button>

    <span>${product.quantity}</span>

    <button class="increase-btn" data-index="${index}">
        +
    </button>

</div>

    <h2>Price: $${product.price.toFixed(2)}</h2>

    <h2>Subtotal: $${(product.price * product.quantity).toFixed(2)}</h2>

</div>

                <button class="remove-btn" data-index="${index}">
                    Delete
                </button>

            </div>
        `;

    });
     const tax = total * 0.10;
    const finalTotal = total + tax;

    if (cartTotal) {
       itemsTotal.textContent = total.toFixed(2);
taxTotal.textContent = tax.toFixed(2);
cartTotal.textContent = finalTotal.toFixed(2);
    }

    if (cartCount) {
        const totalItems = cart.reduce((sum, product) => {

    return sum + product.quantity;

}, 0);

cartCount.textContent = totalItems;
    }

}

loadCart();
// ==========================
// REMOVE PRODUCT
// ==========================

document.addEventListener("click", function(e){

    if(e.target.classList.contains("remove-btn")){

        const index = Number(e.target.dataset.index);

      cart.splice(index, 1);

localStorage.setItem("cart", JSON.stringify(cart));

loadCart();
    }

});
// ==========================
// INCREASE QUANTITY
// ==========================

document.addEventListener("click", function(e){

    if(e.target.classList.contains("increase-btn")){

        const index = Number(e.target.dataset.index);

        cart[index].quantity++;

        localStorage.setItem("cart", JSON.stringify(cart));

        loadCart();

    }

});
// ==========================
// DECREASE QUANTITY
// ==========================

document.addEventListener("click", function(e){

    if(e.target.classList.contains("decrease-btn")){

        const index = Number(e.target.dataset.index);

        cart[index].quantity--;

        if(cart[index].quantity <= 0){

            cart.splice(index,1);

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        loadCart();

    }

});