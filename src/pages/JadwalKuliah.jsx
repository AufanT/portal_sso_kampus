import React from "react";
import "../style/JadwalKuliah.css"

const jadwal = [

  {
    nama: "Pengantar Akuntansi",
    sks: 3,
    jadwal: [{ hari: "Senin", waktu: "07:30 - 10:00", ruang: "Gedung A2.1" }],
  },

  {
    nama: "Pengantar Ekonomi",
    sks: 3,
    jadwal: [{ hari: "Selasa", waktu: "10:10 - 12:40", ruang: "Gedung A2.1" }],
  },

  {
    nama: "Pendidikan Kewarganegaraan",
    sks: 2,
    jadwal: [{ hari: "Rabu", waktu: "10:10 - 12:40", ruang: "Gedung H2.5" }],
  },

  {
    nama: "Pengantar Bisnis",
    sks: 3,
    jadwal: [{ hari: "Kamis", waktu: "07:30 - 10:00", ruang: "Gedung A2.4" }],
  },

 {
    nama: "Pancasila",
    sks: 2,
    jadwal: [{ hari: "Kamis", waktu: "13.30 - 15.10", ruang: "Gedung H2.3" }],
  },

  {
    nama: "Teknologi Informasi Dan Perencanaan Database",
    sks: 2,
    jadwal: [{ hari: "Jumat", waktu: "10:10 - 11:50", ruang: "Labor1" }],
  },

  {
    nama: "Pengantar Perpajakan",
    sks: 3,
    jadwal: [{ hari: "Jumat", waktu: "13:30 - 16:00", ruang: "Gedung A2.6A" }],
  },
];

const JadwalKuliah = () => {
  return (
    <div className="jadwal-container">
      <h1>Jadwal Kuliah</h1>
      <div className="card-grid">
        {jadwal.map((mk, i) => (
          <div key={i} className="jadwal-card">
            <h2>{mk.nama}</h2>
            <p><strong>SKS:</strong> {mk.sks}</p>
            {mk.jadwal.length > 0 ? (
              mk.jadwal.map((j, idx) => (
                <div key={idx} className="jadwal-item">
                  <p><strong>{j.hari}</strong>: {j.waktu}</p>
                  <p>{j.ruang}</p>
                </div>
              ))
            ) : (
              <p className="kosong">Belum ada jadwal</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JadwalKuliah;
