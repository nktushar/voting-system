import React, { useEffect } from "react";
import { Form, Link, Navigate, useActionData } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Login() {
  const actionData = useActionData();
  const { login, user } = useAuth();
  if (user && user.user.role === "student") {
    return <Navigate to="/student/dashboard" />;
  }
  useEffect(() => {
    if (actionData?.data.token) {
      login(actionData.data);
    }
  }, [actionData]);

  return (
    <div className="bg-slate-100 bg-opacity-75">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-950">
            Login
          </h2>
          {/* <img src="./images/iits.png" alt="" className="mx-auto w-20 mb-8" /> */}
          <Form method="POST" className="space-y-4">
            <div>
              <label htmlFor="student-id" className="text-sm font-medium">
                Student ID
              </label>
              <input
                id="student-id"
                name="studentId"
                type="text"
                className="w-full border-gray-300 rounded-md ring-1 focus:ring-blue-500 focus:border-blue-500 p-1"
              />
            </div>
            {/* <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div> */}
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full border-gray-300 rounded-md ring-1 focus:ring-blue-500 focus:border-blue-500 p-1"
              />
            </div>
            {/* Error handle */}
            {actionData?.data?.error ? (
              <div>
                <p className="text-red-500 text-sm">
                  {actionData.data.message.message}
                </p>
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-900"
            >
              Login
            </button>
          </Form>

          <div className="flex items-center justify-center mt-4">
            <p className="text-sm">Already have an account?</p>
            <Link to="/register" className="text-blue-500 ml-2">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
