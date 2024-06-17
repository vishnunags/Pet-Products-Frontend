document.getElementById('add-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const imageUrl = document.getElementById('product-image').value;

    try {
        const response = await fetch(APIURL+'/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, description, image_url: imageUrl })
        });

        if (response.ok) {
            alert('Product added successfully!');
            window.location.href = 'pet-products.html';  // Redirect to index page after successful addition
        } else {
            throw new Error('Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
    }
});
