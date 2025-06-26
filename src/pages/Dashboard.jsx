import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

     return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-container">
        <Link to="/informasi-akademik" className="card">
          <div className="card-title">Informasi Akademik</div>
          <div>Informasi Portal Mahasiswa dan Dosen</div>
        </Link>

        <Link to="/jadwal-kuliah" className="card">
          <div className="card-title">Jadwal Kuliah</div>
          <div>Jadwal Perkuliahan Mahasiswa</div>
        </Link>

        <Link to="/e-learning" className="card">
          <div className="card-title">E-learning</div>
          <div>Sistem Informasi E-learning</div>
        </Link>

        <Link to="/perpustakaan" className="card">
          <div className="card-title">Perpustakaan Online</div>
          <div>Sistem Informasi Perpustakaan</div>
        </Link>

          <Link to="/pembayaran" className="card">
          <div className="card-title">Pembayaran UKT</div>
          <div>Informasi Pembayaran Uang Kuliah Tunggal</div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
