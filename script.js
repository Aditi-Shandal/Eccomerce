const close = document.querySelector(".close");
const open = document.querySelector(".ham");
const menu = document.querySelector(".menu");
const cartCount = document.getElementById("cart-count"); 
const notification = document.getElementById("notification"); 
const searchInput = document.getElementById("search-input"); 

close.addEventListener("click", () => {
    menu.style.visibility = "hidden";
});

open.addEventListener("click", () => {
    menu.style.visibility = "visible";
});


function addToCart(product, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ product, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showNotification(`Added ${product} to cart!`);
}


function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartCount) {
        cartCount.textContent = cart.length; 
    }
}


function showNotification(message) {
    if (notification) {
        notification.textContent = message;
        notification.style.display = "block";
        setTimeout(() => {
            notification.style.display = "none";
        }, 2000);
    }
}


document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const product = event.target.getAttribute("data-product");
        const price = parseFloat(event.target.getAttribute("data-price"));
        
        if (product && !isNaN(price)) {
            addToCart(product, price);
            alert(`Added ${product} to cart.`); 
        } else {
            console.error("Error: Invalid product or price.");
        }
    });
});

function filterProducts(query) {
    const items = document.querySelectorAll(".items");
    items.forEach(item => {
        const name = item.querySelector(".name").textContent.toLowerCase();
        const info = item.querySelector(".info").textContent.toLowerCase();
        if (name.includes(query) || info.includes(query)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        filterProducts(query);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    if (document.getElementById("cart-items")) {
        displayCartItems();
    }
});

function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <p>${item.product} - $${item.price.toFixed(2)}</p>
                </div>
            `).join('');
        }
    }
}
