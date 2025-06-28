import React, { useState } from 'react';
import '../style/PengantarAkuntansi.css';

const PengantarAkuntansi = () => {
  const [topics, setTopics] = useState([
    { name: 'Topik 1', assignments: [] },
    { name: 'Topik 2', assignments: [] },
  ]);

  const handleFileUpload = (e, topicIndex) => {
    const file = e.target.files[0];
    if (file) {
      const updatedTopics = [...topics];
      updatedTopics[topicIndex].assignments.push({
        name: file.name,
        uploadedAt: new Date().toLocaleString(),
      });
      setTopics(updatedTopics);
    }
  };

  return (
    <div className="course-detail-container">
      <h2>Pengantar Akuntansi</h2>
      <p>Drs. Jonhar, M.si., Ak.</p>

      {topics.map((topic, index) => (
        <div key={index} className="topic-card">
          <h3>{topic.name}</h3>

          <label className="upload-label">Kumpulkan tugas:</label>
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, index)}
            className="file-input"
          />

          <ul className="assignment-list">
            {topic.assignments.map((assignment, i) => (
              <li key={i}>
                <strong>{assignment.name}</strong>
                <div className="timestamp">Diunggah: {assignment.uploadedAt}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PengantarAkuntansi;
