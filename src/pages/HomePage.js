import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", flex: "1", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button onClick={() => setSortOrder("asc")} style={{ padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "white", cursor: "pointer" }}>Sort A-Z</button>
        <button onClick={() => setSortOrder("desc")} style={{ padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "#28a745", color: "white", cursor: "pointer" }}>Sort Z-A</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {filteredUsers.map((user) => (
          <Link to={`/user/${user.id}`} key={user.id} style={{ textDecoration: "none" }}>
            <UserCard user={user} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
