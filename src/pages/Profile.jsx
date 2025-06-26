import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';


const Profile = () => {
    const { user } = useAuth();

    const [profileImage, setProfileImage] = useState(
        user?.photo
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));

            const formData = new FormData();
            formData.append("photo", file);
            fetch("/api/upload", { method: "POST", body: formData })
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>

            <div className="profile-card">
                <img src={profileImage} alt="Profile" className="profile-avatar" />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                />

                <div className="profile-info-first">
                    <h2>{user?.name}</h2>
                    <p>{user?.status}</p>
                </div>

                <div className="profile-info-second">
                    <p><strong>NIM:</strong> {user?.nim}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                </div>

                <div className="profile-actions">
                    <button className="btn-secondary">Edit Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
