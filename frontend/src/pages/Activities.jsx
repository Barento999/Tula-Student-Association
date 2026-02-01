import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

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
    <div className="min-h-screen">
      <PageHeader
        title="Our Activities"
        subtitle="Explore our teaching sessions and community programs"
        icon="🎯"
      />

      <div className="container">
        <div className="flex gap-3 mb-8 flex-wrap justify-center">
          {activityTypes.map((type) => (
            <button
              key={type}
              className={`px-5 py-2.5 rounded-3xl text-sm font-medium transition-all duration-300 ${
                selectedType === type
                  ? "bg-whatsapp-green text-main border-whatsapp-green"
                  : "bg-card text-secondary border-border hover:bg-main hover:text-primary"
              } border`}
              onClick={() => setSelectedType(type)}>
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="relative">
              <div className="text-5xl mb-4">{activity.icon}</div>
              <div className="absolute top-6 right-6 bg-whatsapp-green text-main px-3 py-1 rounded-xl text-xs font-semibold">
                {activity.type}
              </div>
              <h3 className="text-xl text-primary mb-2 leading-tight">
                {activity.title}
              </h3>
              <p className="text-sm text-muted mb-3">{activity.date}</p>
              <p className="text-base text-secondary leading-relaxed mb-4">
                {activity.description}
              </p>
              <div className="flex items-center gap-2 pt-4 border-t border-border text-sm text-secondary font-medium">
                <span className="text-lg">👥</span>
                {activity.participants}
              </div>
            </Card>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-[60px] text-secondary text-lg">
            <p>No activities found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
