const productContainer = document.getElementById("product-container");

// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function loadProductDetails() {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await res.json();

        displayProduct(product);
    } catch (error) {
        console.log("Error loading product", error);
    }
}

function displayProduct(product) {
    productContainer.innerHTML = `
        <div class="img-box">
            <img src="${product.image}" alt="">
        </div>

        <div class="details-box">
            <h2>${product.title}</h2>
            <p class="price">₹ ${(product.price * 80).toFixed(0)}</p>

            <p><strong>Category:</strong> ${product.category}</p>

            <p class="description">${product.description}</p>

            <div class="btn-area">
                <button class="btn-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="btn-wishlist" onclick="addToWishlist(${product.id})">Wishlist ❤️</button>
            </div>
        </div>
    `;
}

/* CART SYSTEM */
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let exists = cart.find(item => item.id === id);

    if (exists) {
        exists.qty += 1;
    } else {
        cart.push({ id: id, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart!");
}

/* WISHLIST SYSTEM */
function addToWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist.includes(id)) {
        wishlist.push(id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Added to Wishlist ❤️");
    } else {
        alert("Already in Wishlist!");
    }
}

loadProductDetails();




function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist ❤️");
}
