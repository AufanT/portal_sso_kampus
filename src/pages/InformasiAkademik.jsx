import React from "react";
import "../style/InformasiAkademik.css"

const data = [
  { no: 1, judul: "UTS Semester Ganjil 2024/2025", tanggal: "07 Agustus 2024" },
  { no: 2, judul: "UAS Semester Ganjil 2024/2025", tanggal: "16 Desember 2024" },
  { no: 3, judul: "Heregistrasi Semester Genap 2025/2026", tanggal: "20 Januari 2025" },
  { no: 4, judul: "UTS Semester Genap 2025/2026", tanggal: "07 April 2025" },
  { no: 5, judul: "UAS Semester Genap 2025/2026", tanggal: "26 Januari 2025" },
];

const InformasiAkademik = () => {
  return (
    <div className="container">
      <h2 className="title">Informasi Akademik</h2>
      <table className="table-akademik">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.no} className={index % 2 === 0 ? "even" : "odd"}>
              <td>{item.no}</td>
              <td>{item.judul}</td>
              <td>{item.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InformasiAkademik;
