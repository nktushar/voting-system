import React, { Suspense, useState } from "react";
import { Await, Form, useLoaderData, useSubmit } from "react-router-dom";
import Dashboard from "../../components/layouts/Dashboard";
import { useAuth } from "../../context/AuthProvider";

const Position = () => {
  const { user } = useAuth();
  return (
    <Dashboard>
      <div>Hello Position</div>
    </Dashboard>
  );
};

export default Position;
