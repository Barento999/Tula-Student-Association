import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import "./Activities.css";

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: "Summer 2024 Teaching Sessions",
      type: "Teaching",
      date: "June - August 2024",
      description:
        "Daily teaching sessions across all grade levels with over 50 volunteer teachers",
      participants: "500+ students",
      icon: "📚",
    },
    {
      id: 2,
      title: "School Supplies Distribution",
      type: "Community Support",
      date: "June 2024",
      description:
        "Distributed notebooks, pens, and educational materials to 200 students",
      participants: "200 students",
      icon: "🎒",
    },
    {
      id: 3,
      title: "Mathematics Competition",
      type: "Event",
      date: "July 2024",
      description:
        "Inter-school mathematics competition with prizes for top performers",
      participants: "80 students",
      icon: "🏆",
    },
    {
      id: 4,
      title: "Science Fair",
      type: "Event",
      date: "July 2024",
      description: "Students showcased science projects and experiments",
      participants: "60 students",
      icon: "🔬",
    },
    {
      id: 5,
      title: "English Language Workshop",
      type: "Workshop",
      date: "July 2024",
      description: "Intensive English speaking and writing workshop",
      participants: "45 students",
      icon: "🗣️",
    },
    {
      id: 6,
      title: "Community Cleanup Day",
      type: "Community Support",
      date: "August 2024",
      description:
        "Volunteers and students cleaned public spaces in Tula Village",
      participants: "100+ volunteers",
      icon: "🌱",
    },
    {
      id: 7,
      title: "Career Guidance Session",
      type: "Workshop",
      date: "August 2024",
      description:
        "University students shared their experiences and career advice",
      participants: "120 students",
      icon: "💼",
    },
    {
      id: 8,
      title: "Book Donation Drive",
      type: "Community Support",
      date: "August 2024",
      description: "Collected and distributed 500+ books to students",
      participants: "300+ students",
      icon: "📖",
    },
  ];

  const activityTypes = [
    "All",
    "Teaching",
    "Workshop",
    "Event",
    "Community Support",
  ];
  const [selectedType, setSelectedType] = useState("All");

  const filteredActivities =
    selectedType === "All"
      ? activities
      : activities.filter((a) => a.type === selectedType);

  return (
    <div className="activities-page">
      <PageHeader
        title="Our Activities"
        subtitle="Explore our teaching sessions and community programs"
        icon="🎯"
      />

      <div className="container">
        <div className="activity-filters">
          {activityTypes.map((type) => (
            <button
              key={type}
              className={`filter-btn ${selectedType === type ? "active" : ""}`}
              onClick={() => setSelectedType(type)}>
              {type}
            </button>
          ))}
        </div>

        <div className="activities-grid">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="activity-card">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-type-badge">{activity.type}</div>
              <h3>{activity.title}</h3>
              <p className="activity-date">{activity.date}</p>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-participants">
                <span className="participants-icon">👥</span>
                {activity.participants}
              </div>
            </Card>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="no-activities">
            <p>No activities found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
