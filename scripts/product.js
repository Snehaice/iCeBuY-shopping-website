const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

let allProducts = [];

// ================= LOGIN CHECK =================
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

function requireLogin(action) {
    if (!loggedUser) {
        alert(`Please login to ${action}!`);
        window.location.href = "auth.html";
        return false;
    }
    return true;
}

// ================= USER CART/WISHLIST =================
function getUserCart() {
    if (!loggedUser) return [];
    return JSON.parse(localStorage.getItem(`cart_${loggedUser.email}`)) || [];
}

function saveUserCart(cart) {
    if (!loggedUser) return;
    localStorage.setItem(`cart_${loggedUser.email}`, JSON.stringify(cart));
}

function getUserWishlist() {
    if (!loggedUser) return [];
    return JSON.parse(localStorage.getItem(`wishlist_${loggedUser.email}`)) || [];
}

function saveUserWishlist(wishlist) {
    if (!loggedUser) return;
    localStorage.setItem(`wishlist_${loggedUser.email}`, JSON.stringify(wishlist));
}

// ================= FETCH PRODUCTS =================
async function loadProducts() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        allProducts = data;
        loadCategories(data);
        displayProducts(data);
    } catch (err) {
        console.error("Error fetching products:", err);
        productGrid.innerHTML = "<p>Failed to load products. Try again later.</p>";
    }
}

// ================= LOAD CATEGORIES =================
function loadCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(category => {
        categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

// ================= DISPLAY PRODUCTS =================
function displayProducts(products) {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <h4>${product.title.slice(0, 30)}...</h4>
            <p class="price">₹ ${(product.price * 80).toFixed(0)}</p>

            <button class="btn-view" onclick="viewProduct(${product.id})">View</button>
            
        </div>
    `).join("");
}

// ================= PRODUCT ACTIONS =================
function viewProduct(id) {
    window.location.href = `pro_detail.html?id=${id}`;
}

function addToCart(id, title, price, image) {
    if (!requireLogin("add to cart")) return;

    let cart = getUserCart();
    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }

    saveUserCart(cart);
    alert("Added to Cart!");
}

function addToWishlist(id, title, price, image) {
    if (!requireLogin("add to wishlist")) return;

    let wishlist = getUserWishlist();
    if (!wishlist.some(item => item.id === id)) {
        wishlist.push({ id, title, price, image });
        saveUserWishlist(wishlist);
        alert("Added to Wishlist ❤️");
    } else {
        alert("Already in Wishlist!");
    }
}

// ================= FILTER FUNCTIONS =================
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
sortFilter.addEventListener("change", filterProducts);

function filterProducts() {
    let filtered = allProducts;

    // Search filter
    const searchValue = searchInput.value.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(searchValue));

    // Category filter
    if (categoryFilter.value !== "all") {
        filtered = filtered.filter(p => p.category === categoryFilter.value);
    }

    // Sorting
    if (sortFilter.value === "low-high") filtered.sort((a, b) => a.price - b.price);
    else if (sortFilter.value === "high-low") filtered.sort((a, b) => b.price - a.price);
    else if (sortFilter.value === "az") filtered.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortFilter.value === "za") filtered.sort((a, b) => b.title.localeCompare(a.title));

    displayProducts(filtered);
}

// ================= INITIAL LOAD =================
loadProducts();
