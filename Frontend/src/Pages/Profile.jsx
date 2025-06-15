import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("studentToken");

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-md max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">👤 User Profile</h2>

      {user ? (
        <div className="space-y-4">
          <div>
            <label className="font-medium text-gray-600">Name:</label>
            <p className="text-gray-800">{user.name}</p>
          </div>
          <div>
            <label className="font-medium text-gray-600">Email:</label>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div>
            <label className="font-medium text-gray-600">Registered On:</label>
            <p className="text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
