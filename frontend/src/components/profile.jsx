import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import "./profile.css";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { showSuccess,showError } from "../utils/Toast";

const Profile = () => {
  const [profile, setProfile] = useState({ username: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axiosInstance
      .get("/userInfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setNewUsername(res.data.username);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [token]);

  const handleSave = () => {
    axiosInstance
      .put(
        "/userInfo",
        { username: newUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setProfile(res.data);
        setEditing(false);
        showSuccess("Username updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating username:", err);
        showError("Failed to update username.");
      });
  };

  return (
    <>
    <div style={{display:"flex"}}>
      <Sidebar />
      <div className="profile-container">
        <div className="profile-head">
          <i className="fa fa-user-circle" style={{fontSize:56, color:'#374151', marginRight:12}} aria-hidden="true" />
          <div>
            <h2>Hello, {profile.username || "User"}</h2>
            <div className="profile-sub">Member since: <strong>{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '—'}</strong></div>
          </div>
        </div>

        <div className="profile-row">
          <label>Username</label>
          {editing ? (
            <div className="inline-edit">
              <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
              <button className="save-btn" onClick={handleSave}><i className="fa fa-save" /> Save</button>
            </div>
          ) : (
            <div className="inline-edit">
              <div className="value">{profile.username}</div>
              <button className="edit-btn" onClick={() => setEditing(true)}><i className="fa fa-pencil" /> </button>
            </div>
          )}
        </div>

        <div className="profile-row">
          <label>Email</label>
          <div className="value muted">{profile.email}</div>
        </div>

      </div>
    </div>
     <Footer ></Footer>
    </>
  );
};

export default Profile;
