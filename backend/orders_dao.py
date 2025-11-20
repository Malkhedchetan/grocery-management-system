from datetime import datetime
from sql_connection import get_sql_connection

def insert_order(connection, order):
    cursor = connection.cursor()

    # Insert into orders table
    order_query = (
        "INSERT INTO orders (customer_name, total, datetime) "
        "VALUES (%s, %s, %s)"
    )
    order_data = (order['customer_name'], order['grand_total'], datetime.now())

    cursor.execute(order_query, order_data)
    order_id = cursor.lastrowid

    # Insert into order_detail (your table uses 'quntity')
    order_details_query = (
        "INSERT INTO order_detail (order_id, product_id, quntity, total_price) "
        "VALUES (%s, %s, %s, %s)"
    )

    order_details_data = []
    for item in order['order_details']:
        order_details_data.append([
            order_id,
            int(item['product_id']),
            float(item['quntity']),
            float(item['total_price'])
        ])

    cursor.executemany(order_details_query, order_details_data)
    connection.commit()

    return order_id


def get_order_details(connection, order_id):
    cursor = connection.cursor()

    # --- FIXED SPACING ISSUE ---
    query = (
        "SELECT order_detail.order_id, order_detail.quntity, order_detail.total_price, "
        "products.name, products.price_per_unit "
        "FROM order_detail "
        "LEFT JOIN products ON order_detail.product_id = products.product_id "
        "WHERE order_detail.order_id = %s"
    )

    cursor.execute(query, (order_id,))

    records = []
    for (order_id, quntity, total_price, product_name, price_per_unit) in cursor:
        records.append({
            'order_id': order_id,
            'quntity': quntity,
            'total_price': total_price,
            'product_name': product_name,
            'price_per_unit': price_per_unit
        })

    cursor.close()
    return records


def get_all_orders(connection):
    cursor = connection.cursor()

    query = "SELECT * FROM orders"
    cursor.execute(query)

    response = []
    for (order_id, customer_name, total, datetime) in cursor:
        response.append({
            'order_id': order_id,
            'customer_name': customer_name,
            'total': total,
            'datetime': datetime,     
        })

    cursor.close()

    # Attach order details
    for record in response:
        record['order_details'] = get_order_details(connection, record['order_id'])

    return response
