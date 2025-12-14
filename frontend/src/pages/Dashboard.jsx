import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {

  // 👉 PUT THESE STATES RIGHT HERE (just inside the component)
  const [sweets, setSweets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  // Load sweets
  const loadSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error("Failed to load sweets", err);
      alert("Error fetching sweets");
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  // 👉 ADD Sweet function
 const handleAddSweet = async () => {
  try {
    await api.post("/sweets", newSweet);
    alert("Sweet added!");
    setShowForm(false);
    setNewSweet({ name: "", category: "", price: "", quantity: "" });
    loadSweets();
  } catch (err) {
    console.error("ADD ERROR:", err.response?.data || err.message); // <-- SEE ERROR HERE
    alert("Failed to add sweet");
  }
};


  return (
    <div style={{ padding: 40 }}>
      <h1>🍬 Sweet Shop Dashboard</h1>

      <button
        style={{ marginBottom: 20 }}
        onClick={() => setShowForm(true)}
      >
        ➕ Add Sweet
      </button>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sweets.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.category}</td>
              <td>₹{s.price}</td>
              <td>{s.quantity}</td>
              <td>
                <button>✏ Edit</button>
                &nbsp;
                <button>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 👉 ADD SWEET FORM BELOW */}
      {showForm && (
        <div
          style={{
            padding: 20,
            border: "1px solid black",
            marginTop: 20,
            background: "#f5f5f5"
          }}
        >
          <h3>Add New Sweet</h3>

          <input
            placeholder="Name"
            value={newSweet.name}
            onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
          /><br /><br />

          <input
            placeholder="Category"
            value={newSweet.category}
            onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })}
          /><br /><br />

          <input
            placeholder="Price"
            type="number"
            value={newSweet.price}
            onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
          /><br /><br />

          <input
            placeholder="Quantity"
            type="number"
            value={newSweet.quantity}
            onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })}
          /><br /><br />

          <button onClick={handleAddSweet}>Save</button>
          &nbsp;
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
