import { useState } from "react";
import PageHeader from "../components/PageHeader";

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
    <div className="min-h-screen">
      <PageHeader
        title="Photo Gallery"
        subtitle="Memories from our summer programs"
        icon="📷"
      />

      <div className="container">
        <div className="flex gap-3 mb-10 justify-center flex-wrap">
          {years.map((year) => (
            <button
              key={year}
              className={`px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                selectedYear === year
                  ? "bg-whatsapp-green text-main border-whatsapp-green"
                  : "bg-card text-secondary border-border hover:bg-main hover:text-primary"
              } border`}
              onClick={() => setSelectedYear(year)}>
              Summer {year}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData[selectedYear].map((photo) => (
            <div
              key={photo.id}
              className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)]">
              <div className="aspect-[4/3] bg-gradient-to-br from-main to-[#1a2730] flex flex-col items-center justify-center border-b border-border">
                <span className="text-[64px] mb-3 opacity-50">📸</span>
                <p className="text-muted text-sm">Photo {photo.id}</p>
              </div>
              <div className="p-5">
                <h3 className="text-lg text-primary mb-2">{photo.title}</h3>
                <p className="text-sm text-secondary">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
