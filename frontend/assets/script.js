const API_URL = "http://127.0.0.1:8000";

// LOAD PRODUCTS
async function loadProducts() {
    let res = await fetch(API_URL + "/getProducts");
    let products = await res.json();

    const table = document.getElementById("productTable");

    products.forEach(p => {
        table.innerHTML += `
        <tr>
            <td>${p.product_id}</td>
            <td>${p.name}</td>
            <td>${p.uom_name}</td>
            <td>${p.price_per_unit}</td>
        </tr>`;
    });
}

// LOAD UOM
async function loadUOM() {
    let res = await fetch(API_URL + "/getUOM");
    let data = await res.json();

    const select = document.getElementById("uom");

    data.forEach(u => {
        select.innerHTML += `<option value="${u.uom_id}">${u.uom_name}</option>`;
    });
}

// ADD PRODUCT
async function insertProduct() {
    let form = new FormData();
    form.append("data", JSON.stringify({
        product_name: document.getElementById("name").value,
        uom_id: document.getElementById("uom").value,
        price_per_unit: document.getElementById("price").value
    }));

    let res = await fetch(API_URL + "/insertProduct", {
        method: "POST",
        body: form
    });

    let result = await res.json();
    alert("Product Added ✔️ ID: " + result.product_id);
}
// LOAD ALL ORDERS
async function loadOrders() {
    let res = await fetch(API_URL + "/getAllOrders");
    let orders = await res.json();

    const table = document.getElementById("ordersTable");

    orders.forEach(o => {
        table.innerHTML += `
        <tr>
            <td>${o.order_id}</td>
            <td>${o.customer_name}</td>
            <td>${o.total}</td>
            <td>${o.datetime}</td>
        </tr>`;
    });
}
let orderItems = [];
let allProducts = [];

async function loadProductsForOrder() {
    let res = await fetch(API_URL + "/getProducts");
    allProducts = await res.json();

    let select = document.getElementById("product");

    allProducts.forEach(p => {
        select.innerHTML += `<option value="${p.product_id}">${p.name} (₹${p.price_per_unit})</option>`;
    });
}

function addItem() {
    let productId = document.getElementById("product").value;
    let quantity = document.getElementById("quantity").value;

    if (quantity <= 0) {
        alert("Enter valid quantity!");
        return;
    }

    let product = allProducts.find(p => p.product_id == productId);
    let total = quantity * product.price_per_unit;

    orderItems.push({
        product_id: productId,
        quntity: quantity,
        total_price: total,
        name: product.name,
        price: product.price_per_unit
    });

    updateOrderTable();
}

function updateOrderTable() {
    const table = document.getElementById("orderItemsTable");
    table.innerHTML = "";

    let grandTotal = 0;

    orderItems.forEach(item => {
        grandTotal += item.total_price;

        table.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.quntity}</td>
            <td>${item.price}</td>
            <td>${item.total_price}</td>
        </tr>`;
    });

    document.getElementById("grandTotalTxt").innerHTML = "Grand Total: ₹" + grandTotal;
}

async function submitOrder() {
    let customerName = document.getElementById("customerName").value;

    if (customerName.trim() === "" || orderItems.length === 0) {
        alert("Fill all fields and add items!");
        return;
    }

    let total = orderItems.reduce((sum, item) => sum + item.total_price, 0);

    let form = new FormData();
    form.append("data", JSON.stringify({
        customer_name: customerName,
        grand_total: total,
        order_details: orderItems
    }));

    let res = await fetch(API_URL + "/insertOrder", {
        method: "POST",
        body: form
    });

    let result = await res.json();
    alert("Order Placed ✔️ ID: " + result.order_id);

    location.href = "orders.html";
}
