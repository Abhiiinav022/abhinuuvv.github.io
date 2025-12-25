let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

let slides = document.querySelectorAll(".slide-container");
let index = 0;

function next() {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}

function prev() {
  slides[index].classList.remove("active");
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add("active");
}

document.querySelectorAll(".featured-image-1").forEach((image_1) => {
  image_1.addEventListener("click", () => {
    var src = image_1.getAttribute("src");
    document.querySelector(".big-image-1").src = src;
  });
});

document.querySelectorAll(".featured-image-2").forEach((image_2) => {
  image_2.addEventListener("click", () => {
    var src = image_2.getAttribute("src");
    document.querySelector(".big-image-2").src = src;
  });
});

document.querySelectorAll(".featured-image-3").forEach((image_3) => {
  image_3.addEventListener("click", () => {
    var src = image_3.getAttribute("src");
    document.querySelector(".big-image-3").src = src;
  });
});

// Example product list (should match your slides or featured products)
const products = [
    { id: 1, name: "Nike Metcon Red Shoes", price: 1499, image: "images/home-shoe-1.png" },
    { id: 2, name: "Nike Metcon Blue Shoes", price: 1499, image: "images/home-shoe-2.png" },
    { id: 3, name: "Nike Metcon Yellow Shoes", price: 1499, image: "images/home-shoe-3.png" },
    { id: 4, name: "Nike Airmax Shoes 1", price: 1499, image: "images/f-img-1.1.png" },
    { id: 5, name: "Nike Airmax Shoes 2", price: 1499, image: "images/f-img-2.1.png" },
    { id: 6, name: "Nike Airmax Shoes 3", price: 1499, image: "images/f-img-3.1.png" }
];


// Select all Add to Cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // prevents page jump
        const productId = parseInt(this.dataset.id);
        const product = products.find(p => p.id === productId);
        addToCart(product);
    });
});

// Add to Cart function
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === product.id);

    if (index !== -1) {
        cart[index].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();  // <-- make sure count updates
    alert(`${product.name} added to cart!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Sum quantities of all items
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Call this on page load and after adding an item
updateCartCount();

