// Fetch cart from localStorage or initialize empty
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Select DOM elements
const cartContainer = document.getElementById('cartContainer');
const totalAmount = document.getElementById('totalAmount');
const clearCartBtn = document.getElementById('clearCart');
const cartCountElem = document.getElementById('cartCount'); // optional cart count in header

// Function to display cart items
function displayCart() {
    cartContainer.innerHTML = '';

    if(cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        totalAmount.textContent = '0';
        updateCartCount();
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="content">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: <span id="qty-${index}">${item.quantity}</span></p>
                <button class="btn" onclick="increaseQty(${index})">+</button>
                <button class="btn" onclick="decreaseQty(${index})">-</button>
                <button class="btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    totalAmount.textContent = total;
    updateCartCount();
}

// Functions to update cart
function increaseQty(index) {
    cart[index].quantity += 1;
    updateCart();
}

function decreaseQty(index) {
    if(cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        removeItem(index);
    }
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Optional: update cart count in header
function updateCartCount() {
    if(cartCountElem) {
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCountElem.textContent = count;
    }
}

// Initialize
clearCartBtn.addEventListener('click', clearCart);
displayCart();
