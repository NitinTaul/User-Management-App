import React from "react";

function UserCard({ user }) {
  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
      <h2 style={{ margin: "0 0 10px", fontSize: "1.5rem" }}>{user.name}</h2>
      <p style={{ margin: "0 0 5px", color: "#555" }}>Email: {user.email}</p>
      <p style={{ margin: "0", color: "#555" }}>City: {user.address.city}</p>
    </div>
  );
}

export default UserCard;