import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove any invalid cart items
      const validCart = res.data.cart.filter((item) => item.product);

      setCart(validCart);
    } catch (err) {
      console.log(err);
    }
  };

  const increase = async (productId) => {
    try {
      await axios.put(
        "http://localhost:5000/api/cart",
        {
          productId,
          type: "inc",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const decrease = async (productId) => {
    try {
      await axios.put(
        "http://localhost:5000/api/cart",
        {
          productId,
          type: "dec",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const total = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🛒 My Cart</h2>

      {cart.length === 0 ? (
        <h4 className="text-center">Your Cart is Empty</h4>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="card mb-3 shadow">
              <div className="row g-0">
                <div className="col-md-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="img-fluid rounded-start"
                    style={{
                      height: "180px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-9">
                  <div className="card-body">
                    <h4>{item.product.name}</h4>

                    <p>{item.product.description}</p>

                    <h5 className="text-success">
                      ₹{item.product.price}
                    </h5>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-danger"
                        onClick={() => decrease(item.product._id)}
                      >
                        -
                      </button>

                      <h5 className="mb-0">{item.quantity}</h5>

                      <button
                        className="btn btn-success"
                        onClick={() => increase(item.product._id)}
                      >
                        +
                      </button>
                    </div>

                    <h6 className="mt-3">
                      Subtotal: ₹{item.product.price * item.quantity}
                    </h6>

                    <button
                      className="btn btn-outline-danger mt-3"
                      onClick={() => removeItem(item._id)}
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="card shadow p-4 mt-4">
            <h3>Total : ₹{total}</h3>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;