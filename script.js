// script.js - JavaScript for Plastic Shop Website

// Function to add product to cart
function addToCart(product, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, price: parseFloat(price), quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product} added to cart!`);
}

// Function to load and display cart on cart.html
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-items');
    let total = 0;
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('total-price').textContent = '$0.00';
        return;
    }
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartContainer.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${item.product} (x${item.quantity}) - $${itemTotal.toFixed(2)}</span>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Function to handle Buy Now (redirect to payment)
function buyNow() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'payment.html';
}

// Function to validate contact form
function validateContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
        alert('Name is required.');
        return false;
    }
    if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email.');
        return false;
    }
    if (!message) {
        alert('Message is required.');
        return false;
    }
    alert('Message sent successfully!');
    document.getElementById('contactForm').reset();
    return true;
}

// Function to load payment details on payment.html
function loadPayment() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let billContainer = document.getElementById('bill-details');
    let total = 0;
    billContainer.innerHTML = '';
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        billContainer.innerHTML += `<p>${item.product} (x${item.quantity}): $${itemTotal.toFixed(2)}</p>`;
    });
    document.getElementById('total-bill').textContent = `Total: $${total.toFixed(2)}`;
}

// Function to handle payment form submission (mock)
function submitPayment(event) {
    event.preventDefault();
    alert('Payment processed successfully! (This is a demo.)');
    localStorage.removeItem('cart'); // Clear cart after payment
    window.location.href = 'index.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = this.getAttribute('data-price');
            addToCart(product, price);
        });
    });

    // Load cart if on cart.html
    if (document.getElementById('cart-items')) {
        loadCart();
    }

    // Buy Now button on cart.html
    const buyNowBtn = document.getElementById('buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', buyNow);
    }

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }

    // Load payment if on payment.html
    if (document.getElementById('bill-details')) {
        loadPayment();
    }

    // Payment form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', submitPayment);
    }
});
