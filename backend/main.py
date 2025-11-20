from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from sql_connection import get_sql_connection
import products_dao
import orders_dao
import uom_dao
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connection = get_sql_connection()

@app.get("/getUOM")
def get_uom():
    return uom_dao.get_uoms(connection)

@app.get("/getProducts")
def get_products():
    return products_dao.get_all_products(connection)

@app.post("/insertOrder")
def insert_order(data: str = Form(...)):
    print("RAW RECEIVED DATA:", data)   # <--- ADD THIS
    payload = json.loads(data)
    print("JSON PAYLOAD:", payload)     # <--- ADD THIS
    order_id = orders_dao.insert_order(connection, payload)
    return {"order_id": order_id}


@app.get("/getAllOrders")
def get_all_orders():
    return orders_dao.get_all_orders(connection)

@app.post("/insertOrder")
def insert_order(data: str = Form(...)):
    payload = json.loads(data)
    order_id = orders_dao.insert_order(connection, payload)
    return {"order_id": order_id}

@app.post("/deleteProduct")
def delete_product(product_id: str = Form(...)):
    return_id = products_dao.delete_product(connection, product_id)
    return {"product_id": return_id}
