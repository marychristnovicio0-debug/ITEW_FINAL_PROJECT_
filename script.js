const products = [
    ["Intel Core i5 Processor", 10500, "processor.jpg", "Reliable for school and work."],
    ["8GB DDR4 RAM", 1200, "ram.jpg", "Smooth multitasking performance."],
    ["500GB SSD", 8000, "ssd.jpg", "Fast storage for your files."],
    ["Mechanical Keyboard", 4700, "keyboard.jpg", "Comfortable typing and gaming."],
    ["Gaming Mouse", 4800, "mouse.jpg", "Responsive for work and gaming."],
    ["USB Headset", 950, "headset.jpg", "Great for classes and meetings."]
];

let cart = [];
let reviews = [
    { name: "Alex R.", rating: 5, message: "Good products and affordable prices!" },
    { name: "Jamie C.", rating: 4, message: "Simple and easy-to-use website." }
];

const money = n => "₱" + n.toLocaleString("en-PH");

// Display products
const list = document.getElementById("product-list");

if (list) {
    list.innerHTML = products.map((p, i) => `
        <div class="col-md-4">
            <div class="card h-100">
                <img src="images/${p[2]}" alt="${p[0]}" height="150" style="object-fit:contain">
                <div class="card-body">
                    <h5>${p[0]}</h5>
                    <p>${p[3]}</p>
                    <p><strong>${money(p[1])}</strong></p>
                    <button class="btn btn-brown" onclick="addCart(${i})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join("");
}

// Cart
function addCart(i) {
    let item = cart.find(p => p.name === products[i][0]);

    if (item) item.qty++;
    else cart.push({ name: products[i][0], price: products[i][1], qty: 1 });

    saveCart();
    alert("Added to cart!");
}

function saveCart() {
    const table = document.getElementById("cart-items");
    if (!table) return;

    table.innerHTML = cart.map((p, i) => `
        <tr>
            <td>${p.name}</td>
            <td>${money(p.price)}</td>
            <td>
                <button onclick="changeQty(${i},-1)">-</button>
                ${p.qty}
                <button onclick="changeQty(${i},1)">+</button>
            </td>
            <td>${money(p.price * p.qty)}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeCart(${i})">Remove</button></td>
        </tr>
    `).join("") || '<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>';

    document.getElementById("cart-total").textContent =
        money(cart.reduce((sum, p) => sum + p.price * p.qty, 0));
}

function changeQty(i, n) {
    cart[i].qty += n;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    saveCart();
}

function removeCart(i) {
    cart.splice(i, 1);
    saveCart();
}

// Checkout
const checkout = document.getElementById("checkout-btn");

if (checkout) checkout.onclick = () => {
    if (!cart.length) return alert("Your cart is empty!");

    if (confirm("Proceed with checkout?")) {
        alert("Thank you for shopping at NVCIO!");
        cart = [];
        saveCart();
    }
};

// Reviews
function showReviews() {
    const box = document.getElementById("review-list");

    if (box) {
        box.innerHTML = reviews.map(r => `
            <div class="col-md-6">
                <div class="card p-3">
                    <h5>${r.name}</h5>
                    <p>${"★".repeat(r.rating)}</p>
                    <p>${r.message}</p>
                </div>
            </div>
        `).join("");
    }
}

const reviewForm = document.getElementById("review-form");

if (reviewForm) reviewForm.onsubmit = e => {
    e.preventDefault();

    reviews.push({
        name: document.getElementById("review-name").value.trim(),
        rating: Number(document.getElementById("review-rating").value),
        message: document.getElementById("review-message").value.trim()
    });

    showReviews();
    e.target.reset();
    alert("Review submitted!");
};

// Contact form
const contactForm = document.getElementById("contact-form");

if (contactForm) contactForm.onsubmit = e => {
    e.preventDefault();
    alert("Thank you for contacting NVCIO! This is a demo form.");
    e.target.reset();
};

saveCart();
showReviews();