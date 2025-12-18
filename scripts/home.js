// ========== MOBILE MENU ==========
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    themeToggle.textContent = "🌙";
}

themeToggle?.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    } else {
        localStorage.removeItem("theme");
        themeToggle.textContent = "☀️";
    }
});

// ========== CART COUNT (USER SPECIFIC) ==========
function updateCartCount() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    let count = 0;

    if (loggedUser) {
        // Get cart for logged-in user
        const cart = JSON.parse(localStorage.getItem(`cart_${loggedUser.email}`)) || [];
        // Sum quantity of all items
        count = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    document.getElementById("cart-count").textContent = count;
}

// Call it initially
updateCartCount();


// ========== WISHLIST COUNT ==========
function updateWishlistCount() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    document.getElementById("wishlist-count").textContent = wishlist.length;
}

updateWishlistCount();
document.addEventListener("DOMContentLoaded", () => {
    const featuredContainer = document.getElementById("featured-products");

    async function loadFeaturedProducts() {
        try {
            const res = await fetch("https://fakestoreapi.com/products?limit=10");
            const products = await res.json();

            featuredContainer.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}">
                    <h4>${product.title.slice(0, 30)}...</h4>
                    <p class="price">₹ ${(product.price * 80).toFixed(0)}</p>
                    <a href="pro_detail.html?id=${product.id}" class="btn">View</a>
                </div>
            `).join("");
        } catch (err) {
            console.error("Error loading products:", err);
        }
    }

    loadFeaturedProducts();
});







// Show logged-in user
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (loggedUser) {
    document.getElementById("userName").innerText = `Hello, ${loggedUser.name}`;
}

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", function(){
    localStorage.removeItem("loggedUser");
    alert("Logged out successfully!");
    window.location.href = "login.html";
});
