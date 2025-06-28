import React from 'react';
import { useAuth } from '../context/AuthContext';
import "../style/PembayaranUKT.css"

const PembayaranUKT = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <h2>Pembayaran UKT</h2>
     
      <section className="ukt-info">
        <h3>Informasi Tagihan</h3>
        <ul>
          <li><strong>Nama:</strong> {user?.name} </li>
          <li><strong>NIM:</strong> {user?.nim} </li>
          <li><strong>Semester:</strong> Ganjil 2025/2026</li>
          <li><strong>Jumlah Tagihan:</strong> Rp 3.000.000</li>
        </ul>
      </section>

      <section className="ukt-instructions">
        <h3>Cara Pembayaran</h3>
        <ol>
          <li>Login ke internet banking / mobile banking.</li>
          <li>Pilih menu "Pembayaran Pendidikan".</li>
          <li>Masukkan Kode Institusi dan NIM kamu.</li>
          <li>Ikuti instruksi untuk menyelesaikan pembayaran.</li>
          <li>Simpan bukti bayar untuk konfirmasi.</li>
        </ol>
      </section>

      <section className="ukt-status">
        <h3>Status Pembayaran</h3>
        <p><em>Status: Belum Dibayar</em></p>
      </section>
    </div>
  );
};

export default PembayaranUKT;

