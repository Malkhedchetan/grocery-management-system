
---

# 🛒 Grocery Management System

A complete Grocery Management System designed to manage products, customers, orders, and inventory for retail shops or supermarkets.
Built using **Python, FastAPI, and MySQL**, the system provides a fast, scalable backend for real-world grocery operations.

---

## 🚀 Features

* 📦 **Product Management**
  Add, update, delete, and view products with stock quantities.

* 🧾 **Order Management**
  Create orders, add items, calculate total amounts.

* 🗄️ **Inventory Tracking**
  Auto-update stock after each sale; prevent negative stock.

* ⚡ **FastAPI Backend**
  Clean REST APIs, easy to connect with any frontend (React, HTML, mobile app).

* 🛢️ **MySQL Database**
  Fully relational schema with proper foreign keys.

---

## 🧱 Database Schema

### **Tables Used**

* `products`
* `orders`
* `order_items`

```
products      → Stores product details  
orders        → Stores order information  
order_items   → Links products inside each order  
```

---

## 🛠️ Tech Stack

* **Python**
* **FastAPI**
* **MySQL**
* **Uvicorn**
* **SQLAlchemy**
* **Pydantic**

---

## 📁 Project Structure

```
grocery-management/
│
├── app/
│   ├── main.py
│   ├── database.py
│   ├── routers/
│   │   ├── products.py
│   │   └── orders.py
│   ├── models/
│   │   ├── product.py
│   │   └── order.py
│   └── schemas/
│
├── requirements.txt
└── README.md
```

---

## ▶️ How to Run

### 1️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 2️⃣ Create MySQL database

```sql
CREATE DATABASE grocery_db;
```

### 3️⃣ Update DB credentials in `database.py`

### 4️⃣ Start the backend server

```bash
uvicorn app.main:app --reload
```

---

## 📌 API Endpoints

### **Products**

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | /products      | Get all products |
| POST   | /products      | Add product      |
| PUT    | /products/{id} | Update product   |
| DELETE | /products/{id} | Delete product   |

### **Orders**

| Method | Endpoint | Description      |
| ------ | -------- | ---------------- |
| POST   | /orders  | Create new order |
| GET    | /orders  | Get all orders   |

---

## 🧪 Example JSON: Add Product

```json
{
  "name": "Milk",
  "price": 45.0,
  "stock": 20
}
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a pull request.

---
<img width="1916" height="993" alt="Screenshot 2025-11-22 002116" src="https://github.com/user-attachments/assets/452871b8-c7d0-486e-aa79-6f0a560228c6" />
<img width="1328" height="994" alt="Screenshot 2025-11-22 002137" src="https://github.com/user-attachments/assets/810dc8e0-be89-4663-965f-1c5180f7d5dd" />
'''''''''''''''''''''''''''''''<img width="759" height="992" alt="Screenshot 2025-11-22 002218" src="https://github.com/user-attachments/assets/16e2f148-c54b-40bf-9e07-edeb53735a9d" />'''''''''''''''''''''''''''''''

---
## 👨‍💻 Author

**Chetan Malkhed**
Full-Stack & Backend Developer | Python & SQL Enthusiast

🔗 GitHub: [@Malkhedchetan](https://github.com/Malkhedchetan)
🔗 LinkedIn: *[@Chetan](https://www.linkedin.com/in/chetan-malkhed)*

---


