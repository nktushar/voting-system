import React from "react";
import Signup from "./pages/student/Signup";
import {
  Route,
  defer,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/student/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import Notice from "./pages/admin/NoticeManagement";
import OpenPositionsPage from "./pages/admin/PositionManagement";
import VotingPage from "./pages/student/VotingSystem";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthLayout } from "./components/AuthLayout";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { getUserData, studentLogin, studentRegister } from "./utils/users";
import { votingLoader, votingSubmit } from "./utils/voting";
import { dashboardLoader } from "./utils/studentDashboard";
import { useAuth } from "./context/AuthProvider";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={<AuthLayout />}
        loader={() => defer({ userPromise: getUserData() })}
      >
        <Route path="/" element={<Login />} action={studentLogin}></Route>
        <Route
          path="/register"
          element={<Signup />}
          action={studentRegister}
        ></Route>
        {/* Stuents route */}
        <Route path="/student" element={<ProtectedLayout />}>
          <Route
            path="dashboard"
            element={<StudentDashboard />}
            loader={dashboardLoader}
          ></Route>
          <Route
            path="votingPage"
            element={<VotingPage />}
            loader={() =>
              defer({ votingLoader: (token) => votingLoader(token) })
            }
            action={votingSubmit}
          ></Route>

          <Route path="notice" element={<Notice />}></Route>
          <Route path="openPositions" element={<OpenPositionsPage />}></Route>
        </Route>
        {/* Admin routes */}
        <Route path="/admin">
          <Route path="notice" element={<Notice />}></Route>
          <Route path="openPositions" element={<OpenPositionsPage />}></Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
