document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTableBody = document.querySelector("#cart-table tbody");
    const totalAmountEl = document.querySelector("#total-amount");

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartDisplay() {
        cartTableBody.innerHTML = "";
        let totalAmount = 0;

        cart.forEach((product, index) => {
            const price = parseFloat(product.price.replace("$", "")) || 0;
            const quantity = product.quantity || 1;
            const totalPrice = price * quantity;
            totalAmount += totalPrice;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <div class="product-details">
                        <img src="${product.image}" alt="${product.name}" class="cart-image">
                        <span>${product.name}</span>
                    </div>
                </td>
                <td>
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <span class="quantity">${quantity}</span>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                </td>
                <td>$${totalPrice.toFixed(2)}</td>
                <td>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            cartTableBody.appendChild(row);
        });

        totalAmountEl.textContent = `$${totalAmount.toFixed(2)}`;
    }

    cartTableBody.addEventListener("click", (e) => {
        const index = e.target.dataset.index;

        if (e.target.classList.contains("increase")) {
            cart[index].quantity++;
        } else if (e.target.classList.contains("decrease")) {
            cart[index].quantity--;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
        } else if (e.target.classList.contains("delete-btn")) {
            cart.splice(index, 1);
        }

        saveCart();
        updateCartDisplay();
    });

    document.querySelector("#checkout-btn").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
        } else {
            // Prepare order data
            const orderId = `#${Math.floor(Math.random() * 100000)}`;
            const orderDate = new Date().toLocaleDateString();
            const orderStatus = "Order Received"; // You can modify this later as the order is processed
            const totalAmount = parseFloat(totalAmountEl.textContent.replace("$", ""));

            // Store the order in localStorage under "orderHistory"
            const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
            orderHistory.push({
                orderId: orderId,
                date: orderDate,
                status: orderStatus,
                total: totalAmount.toFixed(2),
                
                
            });

            localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

            // Clear the cart after checkout
            localStorage.removeItem("cart");

            // Redirect to the profile page to view the order history
            window.location.href = "profile.html";
        }
    });

    updateCartDisplay();
});
