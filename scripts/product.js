const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

let allProducts = [];

// Fetch products
async function loadProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    allProducts = data;

    loadCategories(data);

    displayProducts(data);
}

// Load Unique Categories
function loadCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];

    categories.forEach(category => {
        categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

// Display Products
function displayProducts(products) {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}">
            <h4>${product.title.slice(0, 30)}...</h4>
            <p class="price">₹ ${(product.price * 80).toFixed(0)}</p>

            <a href="pro_detail.html?id=${product.id}" class="btn-view">View</a>

        </div>
    `).join("");
}

// Search Function
searchInput.addEventListener("input", () => {
    filterProducts();
});

categoryFilter.addEventListener("change", () => {
    filterProducts();
});

sortFilter.addEventListener("change", () => {
    filterProducts();
});

// Main Filter Function
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
    if (sortFilter.value === "low-high") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortFilter.value === "high-low") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortFilter.value === "az") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortFilter.value === "za") {
        filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    displayProducts(filtered);
}

loadProducts();
