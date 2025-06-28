import React from 'react';
import '../style/NotFound.css'

const NotFound = () => {
    return (
        <div className="notfound-container">
            <p>404 - Halaman tidak ditemukan</p>
            <a href="/" className="back-home">Kembali ke Beranda</a>
        </div>
    );
};

export default NotFound;