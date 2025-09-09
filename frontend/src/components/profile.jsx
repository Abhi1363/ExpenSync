import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import Footer from "./footer";
import Sidebar from "./sidebar";
const Profile = () => {
  const [profile, setProfile] = useState({ username: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/userInfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setNewUsername(res.data.username);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [token]);

  const handleSave = () => {
    axios
      .put(
        "http://localhost:3000/api/userInfo",
        { username: newUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setProfile(res.data);
        setEditing(false);
        alert("Username updated successfully!");
      })
      .catch((err) => console.error("Error updating username:", err));
  };

  return (
    <>
    <div style={{display:"flex"}}><Sidebar></Sidebar>
    <div className="profile-container" style={{ padding: "20px"}}>
      <h2>Hello, {profile.username || "User"} 👋</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Username:</label>
        {editing ? (
          <>
            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
            <button
              onClick={handleSave}
              style={{ marginLeft: "10px", padding: "5px 10px" }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
              {profile.username}
            </span>
            <button
              onClick={() => setEditing(true)}
              style={{ marginLeft: "10px", padding: "2px 10px" }}
            >
              Edit
            </button>
          </>
        )}
      </div>

      <div>
        <label>Email:</label>
        <span style={{ marginLeft: "10px", color: "gray" }}>
          {profile.email}
        </span>
      </div>
   
    </div>
  
    
    </div>
     <Footer ></Footer>
    </>
  );
};

export default Profile;
