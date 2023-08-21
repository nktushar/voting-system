import React, { Suspense, useState } from "react";
import { Await, Form, useLoaderData, useSubmit } from "react-router-dom";
// import Dashboard from "../../components/layouts/Dashboard";
import { useAuth } from "../../context/AuthProvider";
import AdminDashboard from "../../components/layouts/AdminDashboard";

const Admin_Dashboard = () => {
  const { user } = useAuth();
  return (
    <AdminDashboard>
      <div>Hello Admin_Dashboard</div>
    </AdminDashboard>
  );
};

export default Admin_Dashboard;
