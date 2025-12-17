let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cart-items");
const totalItems = document.getElementById("total-items");
const totalPrice = document.getElementById("total-price");

// DISPLAY CART ITEMS
function displayCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="">
                
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <p>₹${item.price}</p>
                </div>

                <div class="quantity-box">
                    <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQty(${index})">+</button>
                </div>

                <div class="item-price">₹${item.price * item.quantity}</div>

                <button class="delete-btn" onclick="deleteItem(${index})">Remove</button>
            </div>
        `;
    });

    totalItems.innerText = count;
    totalPrice.innerText = total;
}

displayCart();


// INCREASE QTY
function increaseQty(i) {
    cart[i].quantity++;
    saveCart();
}

// DECREASE QTY
function decreaseQty(i) {
    if (cart[i].quantity > 1) {
        cart[i].quantity--;
    } else {
        cart.splice(i, 1);
    }
    saveCart();
}

// DELETE ITEM
function deleteItem(i) {
    cart.splice(i, 1);
    saveCart();
}

// SAVE CART
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// CHECKOUT BUTTON
document.getElementById("checkout-btn").addEventListener("click", () => {
    window.location.href = "checkout.html";
});
