import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  const addProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("image", image);

      await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product added successfully 🚀");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>➕ Add Product</h2>

      <input
        className="form-control mb-2"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Stock"
        onChange={(e) => setStock(e.target.value)}
      />

      {/* FILE INPUT FIX HERE */}
      <input
        type="file"
        className="form-control mb-2"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button className="btn btn-success" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;