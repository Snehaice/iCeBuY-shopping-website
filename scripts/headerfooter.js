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
 function updateCartCount() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const cartCountEl = document.getElementById("cart-count");
    
    if (!loggedUser) {
        if (cartCountEl) cartCountEl.textContent = 0;
        return;
    }

    // Get cart for logged-in user
    const cart = JSON.parse(localStorage.getItem(`cart_${loggedUser.email}`)) || [];

    // Sum all quantities
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCountEl) cartCountEl.textContent = count;
}

// Call it initially
updateCartCount();



// ========== WISHLIST COUNT ==========
function updateWishlistCount() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    document.getElementById("wishlist-count").textContent = wishlist.length;
}

updateWishlistCount();


// ================= USER CART =================
function getUserCart() {
    if (!loggedUser) return [];
    return JSON.parse(localStorage.getItem(`cart_${loggedUser.email}`)) || [];
}

