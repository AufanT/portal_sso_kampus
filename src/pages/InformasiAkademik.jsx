import React from "react";

const data = [
  { no: 1, judul: "Heregistrasi Semester Ganjil 2023/2024", tanggal: "21 Agustus 2023" },
  { no: 2, judul: "Perpanjangan Masa Pembayaran Heregistrasi Semester Genap 2022/2023", tanggal: "07 Februari 2023" },
  { no: 3, judul: "Heregistrasi Semester Genap 2022/2023", tanggal: "24 Januari 2023" },
  { no: 4, judul: "Heregistrasi Semester Ganjil 2022/2023", tanggal: "01 Agustus 2022" },
  { no: 5, judul: "Heregistrasi Semester Genap 2021/2022", tanggal: "17 Januari 2022" },
  { no: 6, judul: "Perpanjangan Masa Pembayaran Heregistrasi Semester Ganjil 2021/2022", tanggal: "31 Agustus 2021" },
  { no: 7, judul: "Perpanjangan Masa Pembayaran Heregistrasi Semester Ganjil 2021/2022", tanggal: "23 Agustus 2021" },
  { no: 8, judul: "Heregistrasi Semester Ganjil 2021/2022", tanggal: "28 Juli 2021" },
  { no: 9, judul: "Perpanjangan Masa Pembayaran Heregistrasi Semester Genap 2020/2021", tanggal: "15 Januari 2021" },
  { no: 10, judul: "Heregistrasi Semester Genap 2020/2021", tanggal: "04 Januari 2021" },
  { no: 11, judul: "Perpanjangan Masa Pembayaran Heregistrasi Semester Ganjil 2020/2021", tanggal: "24 Juli 2020" },
  { no: 12, judul: "Heregistrasi Semester Ganjil 2020/2021", tanggal: "13 Juli 2020" },
  { no: 13, judul: "Masa Kuliah dan Praktikum I Semester Genap 2019/2020", tanggal: "05 Juni 2020" },
  { no: 14, judul: "Masa Kuliah dan Praktikum II Semester Genap 2019/2020", tanggal: "05 Juni 2020" },
  { no: 15, judul: "UTS Semester Genap 2019/2020", tanggal: "05 Juni 2020" },
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
