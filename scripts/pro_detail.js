const productContainer = document.getElementById("product-container");

// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

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
    const cart = JSON.parse(localStorage.getItem(`cart_${loggedUser.email}`));
    return cart ? cart : [];
}

function saveUserCart(cart) {
    if (!loggedUser) return;
    localStorage.setItem(`cart_${loggedUser.email}`, JSON.stringify(cart));
}

function getUserWishlist() {
    if (!loggedUser) return [];
    const wishlist = JSON.parse(localStorage.getItem(`wishlist_${loggedUser.email}`));
    return wishlist ? wishlist : [];
}

function saveUserWishlist(wishlist) {
    if (!loggedUser) return;
    localStorage.setItem(`wishlist_${loggedUser.email}`, JSON.stringify(wishlist));
}

// ================= LOAD PRODUCT =================
async function loadProductDetails() {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await res.json();
        displayProduct(product);
    } catch (error) {
        console.error("Error loading product", error);
        productContainer.innerHTML = "<p>Failed to load product details.</p>";
    }
}

// ================= DISPLAY PRODUCT =================
function displayProduct(product) {
    productContainer.innerHTML = `
        <div class="img-box">
            <img src="${product.image}" alt="${product.title}">
        </div>

        <div class="details-box">
            <h2>${product.title}</h2>
            <p class="price">₹ ${(product.price * 80).toFixed(0)}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p class="description">${product.description}</p>

            <div class="btn-area">
                <button class="btn-cart" onclick="addToCart(${product.id}, '${product.title.replace(/'/g,"\\'")}', ${product.price}, '${product.image}')">Add to Cart</button>
                <button class="btn-wishlist" onclick="addToWishlist(${product.id}, '${product.title.replace(/'/g,"\\'")}', ${product.price}, '${product.image}')">Wishlist ❤️</button>
            </div>
        </div>
    `;
}

// ================= CART & WISHLIST ACTIONS =================
function addToCart(id, title, price, image) {
    if (!requireLogin("add to cart")) return;

    let cart = getUserCart();
    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
       cart.push({
    id,
    title,
    price: Math.round(price * 80), // ✅ FIX IS HERE
    image,
    quantity: 1
});

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

// ================= INIT =================
loadProductDetails();




