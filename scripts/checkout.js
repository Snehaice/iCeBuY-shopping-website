// Load items from localStorage cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let orderItemsDiv = document.getElementById("order-items");
let subtotalDiv = document.getElementById("subtotal");
let totalDiv = document.getElementById("total");

let subtotal = 0;

// SHOW ORDER ITEMS
cart.forEach(item => {
    let itemDiv = document.createElement("div");
    itemDiv.classList.add("order-item");

    itemDiv.innerHTML = `
        <span>${item.title} (x${item.quantity})</span>
        <span>₹${item.price * item.quantity}</span>
    `;

    orderItemsDiv.appendChild(itemDiv);

    subtotal += item.price * item.quantity;
});

subtotalDiv.textContent = "₹" + subtotal;
totalDiv.textContent = "₹" + (subtotal + 50); // delivery

// PLACE ORDER BUTTON
document.getElementById("place-order").addEventListener("click", () => {

    alert("🎉 Order Placed Successfully!");

    // clear cart
    localStorage.removeItem("cart");

    // redirect to home
    window.location.href = "home.html";
});
