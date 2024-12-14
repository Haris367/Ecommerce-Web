document.addEventListener("DOMContentLoaded", () => {
    // Load the header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#header-placeholder").innerHTML = data;
        });

    // Load the footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#footer-placeholder").innerHTML = data;
        });
});


document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // Save cart to local storage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Add product to the cart
    function addToCart(product) {
        const existingProduct = cart.find((item) => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }
        saveCart();
        // alert("Product added to cart!");
    }

    // Attach event listeners to all Add to Cart buttons
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const productCard = e.target.closest(".product-card");
            const product = {
                name: productCard.querySelector(".product-name").textContent.trim(),
                price: productCard.querySelector(".product-price").textContent.trim(),
                image: productCard.querySelector(".product-image").src,
                quantity: 1,
            };

            addToCart(product);
        });
    });
});
