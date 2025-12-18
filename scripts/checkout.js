// ================= LOGIN CHECK =================
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
const loginLink = document.getElementById("login-link");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");
const cartCountEl = document.getElementById("cart-count");

if (!loggedUser) {
    alert("Please login to proceed to checkout!");
    window.location.href = "auth.html";
}

// ================= USER CART =================
function getUserCart() {
    if (!loggedUser) return [];
    return JSON.parse(localStorage.getItem(`cart_${loggedUser.email}`)) || [];
}

// ================= CART COUNT =================
function updateCartCount() {
    const cart = getUserCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.innerText = count;
}

// ================= HEADER USER INFO =================
if (loggedUser) {
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";
    userName.textContent = `Hi, ${loggedUser.name || loggedUser.email}`;
}

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    alert("Logged out successfully!");
    window.location.href = "index.html";
});

// ================= RENDER CHECKOUT ITEMS =================
const checkoutItems = document.getElementById("checkout-items");
const totalPriceEl = document.getElementById("checkout-total");
const placeOrderBtn = document.getElementById("place-order-btn");

function renderCheckout() {
    const cart = getUserCart();
    let total = 0;
    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceEl.innerText = 0;
        placeOrderBtn.disabled = true;
        return;
    }

    placeOrderBtn.disabled = false;

    cart.forEach(item => {
        total += Number(item.price) * item.quantity;
        checkoutItems.innerHTML += `
            <div class="checkout-item">
                <img src="${item.image}">
                <div class="checkout-details">
                    <h4>${item.title}</h4>
                    <p>₹ ${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            </div>
        `;
    });

    totalPriceEl.innerText = total.toFixed(0);
}

// ================= PLACE ORDER =================
placeOrderBtn.addEventListener("click", () => {
    const cart = getUserCart();
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Save order history if needed
    // localStorage.setItem(`orders_${loggedUser.email}`, JSON.stringify(cart));

    // Clear cart
    localStorage.removeItem(`cart_${loggedUser.email}`);
    alert("Order placed successfully!");
    window.location.href = "index.html";
});

// ================= INIT =================
updateCartCount();
renderCheckout();
