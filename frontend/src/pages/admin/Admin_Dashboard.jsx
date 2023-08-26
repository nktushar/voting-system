import React, { Suspense, useState } from "react";
import { Await, Form, useLoaderData, useSubmit } from "react-router-dom";
// import Dashboard from "../../components/layouts/Dashboard";
import { useAuth } from "../../context/AuthProvider";
import AdminDashboard from "../../components/layouts/AdminDashboard";

const Admin_Dashboard = () => {
  const { user } = useAuth();

  const memberCount = 2000;
  const upcomingEvents = [
    { id: 1, title: "Event 1" },
    { id: 2, title: "Event 2" },
    // ...
  ];
  return (
    <AdminDashboard>
      <div className="flex-1 p-4">
        {/* Top Section */}
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-bold">
            Welcome to the family of <br /> {memberCount} members
          </h1>
        </div>

        {/* Two Sections */}
        <div className="flex">
          {/* Upcoming Events */}
          <div className="w-1/2 pr-2">
            <div className="bg-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2 text-center">
                Upcoming Events
              </h2>
              <ul>
                {upcomingEvents.map((event) => (
                  <li key={event.id} className="mb-2">
                    {event.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboard>
  );
};

export default Admin_Dashboard;
