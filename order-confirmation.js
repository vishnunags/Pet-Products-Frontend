document.addEventListener('DOMContentLoaded', () => {
    displayOrderDetails();

    // Add event listener for the back-to-main button
    document.getElementById('back-to-main').addEventListener('click', () => {
        window.location.href = 'pet-products.html';
    });
});

function displayOrderDetails() {
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));

    if (!orderDetails) {
        document.getElementById('order-details').innerHTML = '<p>No order details found.</p>';
        return;
    }

    const orderDetailsDiv = document.getElementById('order-details');
    orderDetailsDiv.innerHTML = `
        <h3>Order ID: ${orderDetails.orderId}</h3>
        <p>Total Amount: $${orderDetails.totalAmount.toFixed(2)}</p>
        <ul>
            ${orderDetails.items.map(item => `<li>${item.name} - Quantity: ${item.quantity}, Price: $${item.price.toFixed(2)}</li>`).join('')}
        </ul>
    `;
}
