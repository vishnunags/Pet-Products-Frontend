let quantities = {}; // Initialize an empty object to store quantities dynamically
let cart = []; 

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error (e.g., show error message to user)
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        // Initialize quantity to 1 if not already set
        if (!quantities[product.id]) {
            quantities[product.id] = 1;
        }

        // Check if product.price is a valid number before using toFixed()
        const price = product.price;

        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.setAttribute('data-id', product.id); // Set data-id attribute for identification
        productElement.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${price}</p> <!-- Use price variable here -->
            <div class="quantity-controls">
                <button onclick="decrementQuantity(${product.id})">-</button>
                <span id="quantity-${product.id}">${quantities[product.id]}</span>
                <button onclick="incrementQuantity(${product.id})">+</button>
            </div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productsContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    const productName = productElement.querySelector('h3').textContent;
    const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));
    const quantity = quantities[productId];

    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: quantity
    };

    // Check if the product is already in the cart
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex !== -1) {
        // If product already exists in cart, update the quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Otherwise, add the product to the cart
        cart.push(product);
    }

    // Update local storage with the updated cart
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // Provide feedback to the user
    alert(`${quantity} ${productName}(s) have been added to your cart.`);
    console.log(cart);
}

function incrementQuantity(productId) {
    quantities[productId]++;
    document.getElementById(`quantity-${productId}`).textContent = quantities[productId];
}

function decrementQuantity(productId) {
    if (quantities[productId] > 1) {
        quantities[productId]--;
        document.getElementById(`quantity-${productId}`).textContent = quantities[productId];
    }
}

// Example function to fetch and display cart items on cart.html
function fetchAndDisplayCartItems() {
    // Implement fetching and displaying cart items logic here
    // This could involve fetching data from a backend or using local storage
    // Example:
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
        // Display cart items on the cart.html page
        console.log('Cart items:', cartItems);
        // Example: display items in a list on cart.html
        const cartList = document.getElementById('cart-items');
        cartList.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Quantity: ${item.quantity}`;
            cartList.appendChild(li);
        });
    } else {
        console.log('Cart is empty');
    }
}

// Call fetchAndDisplayCartItems() when the cart page loads
if (document.URL.includes('cart.html')) {
    document.addEventListener('DOMContentLoaded', fetchAndDisplayCartItems);
}

// Example function to fetch and display cart items on cart.html
function fetchAndDisplayCartItems() {
    // Implement fetching and displaying cart items logic here
    // This could involve fetching data from a backend or using local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const totalAmount = calculateTotal(cartItems);

    if (cartItems && cartItems.length > 0) {
        const cartList = document.getElementById('cart-items');
        cartList.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Quantity: ${item.quantity}`;
            cartList.appendChild(li);
        });

        document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
    } else {
        const cartList = document.getElementById('cart-items');
        cartList.innerHTML = '<li>Your cart is empty.</li>';
        document.getElementById('total-amount').textContent = '$0.00';
    }
}

// Example function to calculate total amount
function calculateTotal(cartItems) {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    return total;
}

// Call fetchAndDisplayCartItems() when the cart page loads
if (document.URL.includes('cart.html')) {
    document.addEventListener('DOMContentLoaded', fetchAndDisplayCartItems);
}
