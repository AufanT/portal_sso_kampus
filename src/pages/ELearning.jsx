import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ELearning = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>Portal E-Learning</h2>
      <p>Selamat datang di sistem pembelajaran online. Silakan akses materi, tugas, dan forum diskusi untuk setiap mata kuliah.</p>

      <section className="course-list">
        <h3>Mata Kuliah</h3>
        <ul>
          <li>
            <Link to="/pengantar-akuntansi" className="class">
              <div className="class-tittle">Pengantar Akuntansi</div>
            </Link>
          </li>
          <li>
            <Link to="/pengantar-bisnis" className="class">
              <div className="class-tittle">Pengantar Bisnis</div>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ELearning;
