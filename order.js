function updateOrderHistory() {
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const orderTableBody = document.querySelector("#order-history-body");

    orderTableBody.innerHTML = ""; // Clear the existing table rows

    orderHistory.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.date}</td>
            <td>${order.status}</td>
            <td>$${order.total}</td>
        `;
        orderTableBody.appendChild(row);
    });
}

// Call this function to update the order history when the page is loaded
document.addEventListener("DOMContentLoaded", updateOrderHistory);
