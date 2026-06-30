import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch orders");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📦 My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center">
          <h4>No orders yet</h4>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">
                Order ID: {order._id}
              </h5>

              <p>
                <strong>Status:</strong>{" "}
                <span className="badge bg-primary">
                  {order.orderStatus}
                </span>
              </p>

              <p>
                <strong>Total:</strong> ₹{order.totalPrice}
              </p>

              <hr />

              <h6>Items Ordered</h6>

              {order.orderItems.map((item) => (
                <div
                  key={item._id || item.product?._id}
                  className="mb-2"
                >
                  <p className="mb-1">
                    <strong>
                      {item.product
                        ? item.product.name
                        : "Product Deleted"}
                    </strong>
                  </p>

                  <p className="mb-1">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-success">
                    ₹
                    {item.product
                      ? item.product.price
                      : 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;