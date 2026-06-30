import { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>📦 Admin Products</h2>

      {products.map((p) => (
        <div key={p._id} className="card p-3 mb-3">
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>
          <p>Stock: {p.stock}</p>

          <button
            className="btn btn-danger"
            onClick={() => deleteProduct(p._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;