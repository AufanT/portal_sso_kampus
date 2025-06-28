import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../style/Profile.css'

const Profile = () => {
    const { user, updatePhoto } = useAuth();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            updatePhoto(imageUrl); // ✅ Update context

            // Jika ingin kirim ke server:
            const formData = new FormData();
            formData.append("photo", file);

            fetch("/api/upload", {
                method: "POST",
                body: formData
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data?.photoUrl) {
                        updatePhoto(data.photoUrl); // pakai URL dari server jika ada
                    }
                })
                .catch((err) => console.error("Upload error:", err));
        }
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Profile</h1>

            <div className="profile-card">
                <img
                    src={user?.photo || '/default-avatar.png'}
                    alt="Profile"
                    className="profile-avatar"
                />

                <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input-hidden"
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
                    <label className="custom-file-label">Edit Profile</label> <label htmlFor="file-upload" className="custom-file-label">Upload Foto</label>
                </div> 
            </div>
        </div>
    );
};

export default Profile;
