import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query = "", cat = "") => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/products?search=${query}&category=${cat}`
    );
    setProducts(res.data.products);
  } catch (err) {
    console.log(err);
  }
};

  const handleSearch = (e) => {
  const value = e.target.value;
  setSearch(value);
  fetchProducts(value, category);
};

const handleCategory = (cat) => {
  setCategory(cat);
  fetchProducts(search, cat);
};

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Product added to cart!");
    } catch (err) {
      console.log(err);
      alert("❌ Add to Cart failed");
    }
  };

  const addToWishlist = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/wishlist",
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("❤️ Added to Wishlist");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🛍 Our Products</h1>
      <div className="mb-3 d-flex gap-2 flex-wrap">

  <button className="btn btn-dark" onClick={() => handleCategory("")}>
    All
  </button>

  <button className="btn btn-outline-primary" onClick={() => handleCategory("Electronics")}>
    Electronics
  </button>

  <button className="btn btn-outline-primary" onClick={() => handleCategory("Mobiles")}>
    Mobiles
  </button>

  <button className="btn btn-outline-primary" onClick={() => handleCategory("Accessories")}>
    Accessories
  </button>

  <button className="btn btn-outline-primary" onClick={() => handleCategory("Audio")}>
    Audio
  </button>

</div>

      {/* 🔍 SEARCH BOX (IMPORTANT) */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search products..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <div
  className="card shadow h-100"
  style={{ cursor: "pointer" }}
  onClick={() => navigate(`/product/${p._id}`)}
>
              <img
                src={p.image}
                className="card-img-top"
                alt={p.name}
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <h5>{p.name}</h5>

                <p className="text-muted">{p.description}</p>

                <h4 className="text-success">₹{p.price}</h4>

                <p><strong>Stock:</strong> {p.stock}</p>

                <button
  className="btn btn-primary w-100"
  onClick={(e) => {
    e.stopPropagation();
    addToCart(p._id);
  }}
>
  🛒 Add to Cart
</button>


              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;