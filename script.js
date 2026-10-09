// Mock Product Database
const products = [
    { id: 1, name: "Premium Leather Watch", price: 129.99, image: "https://unsplash.com" },
    { id: 2, name: "Minimalist Backpack", price: 79.99, image: "https://unsplash.com" },
    { id: 3, name: "Wireless Headphones", price: 199.99, image: "https://unsplash.com" },
    { id: 4, name: "Ergonomic Desk Chair", price: 249.99, image: "https://unsplash.com" }
];

let cart = [];

// Initialize Page and Render Products
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});

function renderProducts() {
    const container = document.getElementById("product-container");
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join("");
}

// Open / Close Cart Sidebar
function toggleCart() {
    const sidebar = document.getElementById("cart-sidebar");
    sidebar.classList.toggle("open");
}

// Add Item to Shopping Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// Update Cart Count, List, and Total Price
function updateCartUI() {
    // Update Count Icon
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalCount;

    // Update List Items
    const cartItemsContainer = document.getElementById("cart-items");
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <small>$${item.price} x ${item.quantity}</small>
                </div>
                <button class="close-btn" onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `).join("");
    }

    // Update Total Price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById("cart-total").innerText = totalPrice.toFixed(2);
}

// Remove Item from Shopping Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Simple Checkout Action
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add products first.");
        return;
    }
    alert("Thank you for shopping at Mehdirah Store! Order placed successfully.");
    cart = [];
    updateCartUI();
    toggleCart();
}
