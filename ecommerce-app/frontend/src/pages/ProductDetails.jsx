import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <div className="row">

        <div className="col-md-6">
          <img
            src={product.image}
            className="img-fluid"
            alt={product.name}
            style={{ borderRadius: "10px" }}
          />
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>

          <p className="text-muted">{product.description}</p>

          <h3 className="text-success">₹{product.price}</h3>

          <p><strong>Stock:</strong> {product.stock}</p>

          <button className="btn btn-primary mt-3">
            🛒 Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;