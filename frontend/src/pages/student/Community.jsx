import React, { Suspense, useState } from "react";
import { Await, Form, useLoaderData, useSubmit } from "react-router-dom";
import Dashboard from "../../components/layouts/Dashboard";
import { useAuth } from "../../context/AuthProvider";

const Community = () => {
  const { user } = useAuth();
  return (
    <Dashboard>
      <div>Hello Community</div>
    </Dashboard>
  );
};

export default Community;
