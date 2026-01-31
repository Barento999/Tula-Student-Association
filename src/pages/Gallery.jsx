import { useState } from "react";
import PageHeader from "../components/PageHeader";
import "./Gallery.css";

const Gallery = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const galleryData = {
    2024: [
      {
        id: 1,
        title: "Opening Ceremony",
        description: "Summer 2024 program kickoff",
      },
      {
        id: 2,
        title: "Mathematics Class",
        description: "Secondary students learning algebra",
      },
      { id: 3, title: "Science Lab", description: "Hands-on experiments" },
      { id: 4, title: "Group Study", description: "Students collaborating" },
      {
        id: 5,
        title: "Awards Ceremony",
        description: "Recognizing top performers",
      },
      { id: 6, title: "Community Event", description: "Village gathering" },
    ],
    2023: [
      {
        id: 7,
        title: "Teaching Session",
        description: "English language class",
      },
      {
        id: 8,
        title: "Sports Day",
        description: "Community sports activities",
      },
      {
        id: 9,
        title: "Book Distribution",
        description: "Giving out learning materials",
      },
      {
        id: 10,
        title: "Volunteer Team",
        description: "Our dedicated volunteers",
      },
    ],
    2022: [
      { id: 11, title: "First Day", description: "Summer 2022 program start" },
      { id: 12, title: "Art Workshop", description: "Creative activities" },
      { id: 13, title: "Graduation", description: "End of summer celebration" },
    ],
  };

  const years = Object.keys(galleryData);

  return (
    <div className="gallery-page">
      <PageHeader
        title="Photo Gallery"
        subtitle="Memories from our summer programs"
        icon="📷"
      />

      <div className="container">
        <div className="year-filters">
          {years.map((year) => (
            <button
              key={year}
              className={`year-btn ${selectedYear === year ? "active" : ""}`}
              onClick={() => setSelectedYear(year)}>
              Summer {year}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {galleryData[selectedYear].map((photo) => (
            <div key={photo.id} className="gallery-item">
              <div className="gallery-placeholder">
                <span className="placeholder-icon">📸</span>
                <p className="placeholder-text">Photo {photo.id}</p>
              </div>
              <div className="gallery-info">
                <h3>{photo.title}</h3>
                <p>{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
