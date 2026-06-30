function AdminDashboard() {
  return (
    <div className="container mt-5">
      <h2>👑 Admin Dashboard</h2>

      <div className="mt-4">
        <button className="btn btn-primary m-2">
          Add Product
        </button>

        <button className="btn btn-warning m-2">
          Manage Orders
        </button>

        <button className="btn btn-success m-2">
          Manage Products
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;