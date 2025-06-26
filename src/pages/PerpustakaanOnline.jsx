import React from "react";


const PerpustakaanOnline = () => {
  return (
    <div className="library-container">
      <section className="hero">
        <h1 className="logo">Perpustakaan Online</h1>
        <h2>Selamat Datang di Perpustakaan Online</h2>
        <p>Akses ribuan buku dari mana saja, kapan saja.</p>
      </section>

      <section id="tentang" className="section">
        <h2>Tentang Perpustakaan</h2>
        <p>
          Perpustakaan Online adalah platform membaca online yang menyediakan
          akses ke ribuan buku digital dari berbagai kategori — dari fiksi,
          ilmiah, hingga buku anak.
        </p>
      </section>
      
      <section id="koleksi" className="section">
        <h2>Koleksi Buku</h2>
        <div className="book-grid">
          {[
            { title: "Bumi", author: "Tere Liye" },
            { title: "Sapiens", author: "Yuval Noah Harari" },
            { title: "Laskar Pelangi", author: "Andrea Hirata" },
            { title: "Atomic Habits", author: "James Clear" },
            { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
            { title: "Filosofi Teras", author: "Henry Manampiring" },
          ].map((book, idx) => (
            <div key={idx} className="book-card">
              <div className="book-cover">📘</div>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <div className="book-actions">
                <button>Baca</button>
              </div>
            </div>
          ))}
        </div>
      </section>
     </div>
  );
};

export default PerpustakaanOnline;