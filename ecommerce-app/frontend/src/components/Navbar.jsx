import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
        🛒 E-Commerce
      </Link>

      <div className="ms-auto">
        <Link to="/" className="btn btn-outline-light me-2">
          Home
        </Link>

        <Link to="/wishlist" className="btn btn-danger me-2">
          ❤️ Wishlist
        </Link>

        <Link to="/cart" className="btn btn-warning me-2">
          🛒 Cart
        </Link>

        <Link to="/login" className="btn btn-success">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;