import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  // Update Order Status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/admin/${id}`,
        { orderStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>👑 Admin Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="card p-3 mb-3">
          <h5>User: {order.user.name}</h5>
          <p>Total: ₹{order.totalPrice}</p>
          <p>Status: {order.orderStatus}</p>

          <div>
            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="form-control w-50"
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>

          <hr />

          {order.orderItems.map((item) => (
            <p key={item._id}>
              {item.product.name} × {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;