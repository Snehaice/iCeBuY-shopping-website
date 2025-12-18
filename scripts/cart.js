const cartItems = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartCountEl = document.getElementById("cart-count");

// ================= LOGIN =================
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

function getUserCart() {
  if (!loggedUser) return [];
  return JSON.parse(localStorage.getItem(`cart_${loggedUser.email}`)) || [];
}

function saveUserCart(cart) {
  if (!loggedUser) return;
  localStorage.setItem(`cart_${loggedUser.email}`, JSON.stringify(cart));
}

// ================= CART COUNT =================
function updateCartCount() {
  let count = 0;
  if (loggedUser) {
    const cart = getUserCart();
    count = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  cartCountEl.innerText = count;
}

// ================= RENDER CART =================
function renderCart() {
  if (!loggedUser) {
    cartItems.innerHTML = "<p class='empty-cart'>Please login to view cart</p>";
    checkoutBtn.disabled = true;
    cartCountEl.innerText = 0;
    totalPriceEl.innerText = 0;
    return;
  }

  let cart = getUserCart();
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p class='empty-cart'>Your cart is empty</p>";
    checkoutBtn.disabled = true;
    totalPriceEl.innerText = 0;
    updateCartCount();
    return;
  }

  checkoutBtn.disabled = false;

  cart.forEach((item, index) => {
    total += Number(item.price) * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div class="cart-details">
          <h4>${item.title}</h4>
          <p>₹ ${item.price}</p>
          <div class="quantity-control">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalPriceEl.innerText = total.toFixed(0);
  updateCartCount();
}

// ================= ACTIONS =================
function changeQty(index, change) {
  let cart = getUserCart();
  if (cart[index].quantity + change < 1) return;
  cart[index].quantity += change;
  saveUserCart(cart);
  renderCart(); // Re-render cart
}

function removeItem(index) {
  let cart = getUserCart();
  cart.splice(index, 1);
  saveUserCart(cart);
  renderCart(); // Re-render cart
}

checkoutBtn.addEventListener("click", () => {
  alert("Proceeding to checkout...");
  window.location.href = "checkout.html";
});

// ================= INIT =================
updateCartCount();
renderCart();
