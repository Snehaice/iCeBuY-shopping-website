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

// ========== CART COUNT ==========
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

updateCartCount();

// ========== WISHLIST COUNT ==========
function updateWishlistCount() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    document.getElementById("wishlist-count").textContent = wishlist.length;
}

updateWishlistCount();
