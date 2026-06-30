import { useEffect, useState } from "react";
import axios from "axios";

function Wishlist() {
  const [items, setItems] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(res.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>❤️ Wishlist</h2>

      {items.map((item) => (
        <div key={item._id} className="card p-3 mb-3">
          <h5>{item.product.name}</h5>
          <p>₹{item.product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;