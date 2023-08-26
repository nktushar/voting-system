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
import AdminLogin from "./pages/admin/AdminLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import Notice from "./pages/admin/NoticeManagement";
import OpenPositionsPage from "./pages/admin/PositionManagement";
import VotingPage from "./pages/student/VotingSystem";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthLayout } from "./components/AuthLayout";
import { ProtectedLayout } from "./components/ProtectedLayout";
import {
  adminLogin,
  getUserData,
  studentLogin,
  studentRegister,
} from "./utils/users";
import { votingLoader, votingSubmit } from "./utils/voting";
import { dashboardLoader } from "./utils/studentDashboard";
import { useAuth } from "./context/AuthProvider";
import Community from "./pages/student/Community";
import Position from "./pages/student/Position";
import Application from "./pages/student/Application";
import Admin_Dashboard from "./pages/admin/Admin_Dashboard";
import Candidates from "./pages/admin/Candidates";
import Votes from "./pages/admin/Votes";
import { noticeLoader, postNotice } from "./utils/noticeManagement";
import { managePosition, positionLoader } from "./utils/positionManagement";
import { positionApply, positionApplyLoader } from "./utils/positionApply";
import { yourApplicationLoader } from "./utils/yourApplication";
import { candidatesLoader } from "./utils/candidatesList";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={<AuthLayout />}
        loader={() => defer({ userPromise: getUserData() })}
      >
        <Route path="/" element={<Login />} action={studentLogin}></Route>
        <Route
          path="/adminLogin"
          element={<AdminLogin />}
          action={adminLogin}
        ></Route>
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
          <Route path="community" element={<Community />}></Route>
          <Route
            path="position"
            element={<Position />}
            loader={() =>
              defer({
                positionApplyLoader: (user) => positionApplyLoader(user),
              })
            }
            action={positionApply}
          ></Route>
          <Route
            path="application"
            element={<Application />}
            loader={() =>
              defer({
                yourApplicationLoader: (user) => yourApplicationLoader(user),
              })
            }
          ></Route>
        </Route>
        {/* Admin routes */}
        <Route path="/admin">
          <Route path="adminDashboard" element={<Admin_Dashboard />}></Route>
          <Route
            path="notice"
            element={<Notice />}
            loader={noticeLoader}
            action={postNotice}
          ></Route>
          <Route
            path="openPositions"
            element={<OpenPositionsPage />}
            loader={positionLoader}
            action={managePosition}
          ></Route>
          <Route
            path="candidates"
            element={<Candidates />}
            loader={() =>
              defer({
                candidatesLoader: () => candidatesLoader(),
              })
            }
          ></Route>
          <Route path="votes" element={<Votes />}></Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
