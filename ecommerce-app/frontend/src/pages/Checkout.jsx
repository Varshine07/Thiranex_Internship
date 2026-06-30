import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Place Order
  const placeOrder = async () => {
    try {
      // Validation
      if (!address || !city || !state || !pincode) {
        alert("Please fill all fields");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        {
          shippingAddress: {
            address,
            city,
            state,
            pincode,
          },
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Order placed successfully!");

      navigate("/orders");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Order Failed");
    }
  };

  // Razorpay Payment (Optional)
  const handlePayment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: 500, // Later replace with actual cart total
        }
      );

      const order = res.data.order;

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: order.amount,
        currency: "INR",
        name: "My Shop",
        order_id: order.id,

        handler: function () {
          placeOrder();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              🛒 Checkout
            </h2>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label">
                Address
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* City */}
            <div className="mb-3">
              <label className="form-label">
                City
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            {/* State */}
            <div className="mb-3">
              <label className="form-label">
                State
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            {/* Pincode */}
            <div className="mb-3">
              <label className="form-label">
                Pincode
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            {/* Payment */}
            <div className="mb-4">
              <label className="form-label">
                Payment Method
              </label>

              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>Cash on Delivery</option>
                <option>UPI</option>
                <option>Credit Card</option>
              </select>
            </div>

            {/* COD Button */}
            <button
              className="btn btn-success w-100"
              onClick={placeOrder}
            >
              Place Order
            </button>

            {/* Razorpay Button (Optional) */}
            {/*
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handlePayment}
            >
              Pay Online
            </button>
            */}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Checkout;