import { useEffect, useState } from "react";
import api from "../api";


export default function Dashboard() {

    // 👉 PUT THESE STATES RIGHT HERE (just inside the component)
    const [editSweet, setEditSweet] = useState(null);
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
    // 👉 ADD SWEET
    const handleAddSweet = async () => {
        try {
            await api.post("/sweets", {
                name: newSweet.name,
                category: newSweet.category,
                price: Number(newSweet.price),
                quantity: Number(newSweet.quantity),
            });

            alert("Sweet added successfully!");

            setNewSweet({ name: "", category: "", price: "", quantity: "" });
            setShowForm(false);

            loadSweets();
        } catch (err) {
            console.error("ADD ERROR:", err.response?.data || err.message);
            alert("Failed to add sweet: " + (err.response?.data?.error || err.message));
        }
    };

    // 👉 UPDATE SWEET
    const handleUpdateSweet = async () => {
        try {
            await api.put(`/sweets/${editSweet.id}`, {
                name: editSweet.name,
                category: editSweet.category,
                price: Number(editSweet.price),
                quantity: Number(editSweet.quantity),
            });

            alert("Sweet updated!");

            setEditSweet(null);
            loadSweets();
        } catch (err) {
            console.error("UPDATE ERROR:", err.response?.data || err.message);
            alert("Failed to update sweet");
        }
    };
    // 👉 DELETE SWEET
    const handleDeleteSweet = async (id) => {
        if (!confirm("Are you sure you want to delete this sweet?")) return;

        try {
            await api.delete(`/sweets/${id}`);

            alert("Sweet deleted!");
            loadSweets();
        } catch (err) {
            console.error("DELETE ERROR:", err.response?.data || err.message);
            alert("Failed to delete sweet");
        }
    };


    return (
        <div style={{
            padding: 40, fontFamily: "Arial, sans-serif",
            background: "#f0f4f8",
            minHeight: "100vh"
        }}>

            <button
                style={{ float: "right", background: "red", color: "white" }}
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }}
            >
                Logout
            </button>

            <h1>🍬 Sweet Shop Dashboard</h1>

            <button
                style={{ marginBottom: 20 }}
                onClick={() => setShowForm(true)}
            >
                ➕ Add Sweet
            </button>

            <table
                style={{
                    width: "100%",
                    background: "white",
                    borderCollapse: "collapse",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}
            >
                <th style={{ color: "white", padding: 10 }}></th>    
                <td style={{ padding: 10 }}></td>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Qty</th>
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
                                <button onClick={() => setEditSweet(s)}>✏ Edit</button>
                                &nbsp;
                                <button onClick={() => handleDeleteSweet(s.id)}>🗑 Delete</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 👉 ADD SWEET FORM BELOW */}
            {editSweet && (
                <div
                    style={{
                        padding: 20,
                        border: "1px solid black",
                        marginTop: 20,
                        background: "#e9f7ff"
                    }}
                >
                    <h3>Edit Sweet</h3>

                    <input
                        placeholder="Name"
                        value={editSweet.name}
                        onChange={(e) => setEditSweet({ ...editSweet, name: e.target.value })}
                    /><br /><br />

                    <input
                        placeholder="Category"
                        value={editSweet.category}
                        onChange={(e) => setEditSweet({ ...editSweet, category: e.target.value })}
                    /><br /><br />

                    <input
                        placeholder="Price"
                        type="number"
                        value={editSweet.price}
                        onChange={(e) => setEditSweet({ ...editSweet, price: e.target.value })}
                    /><br /><br />

                    <input
                        placeholder="Quantity"
                        type="number"
                        value={editSweet.quantity}
                        onChange={(e) => setEditSweet({ ...editSweet, quantity: e.target.value })}
                    /><br /><br />

                    <button onClick={handleUpdateSweet}>Update</button>
                    &nbsp;
                    <button onClick={() => setEditSweet(null)}>Cancel</button>
                </div>
            )}
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
