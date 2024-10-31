import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components";
import React from "react";
import {
  About, Admin,
  Auth,
  ClientProfile,
  FindClients,
  FindJobs,
  JobDetail, JobProgress,
  UploadJob,
  UserProfile,
} from "./pages";
import { useSelector } from "react-redux";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./helpers/keycloak";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="user-auth" state={{ from: location }} replace={true} />
  );
}

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col min-h-screen">
      <ReactKeycloakProvider authClient={keycloak}>
        <Navbar />
        <main className="flex-grow mx-8">
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<Navigate to="/find-jobs" replace={true} />}
              />
              <Route path="/find-jobs" element={<FindJobs />} />
              <Route path="/find-clients" element={<FindClients />} />
              <Route
                path={
                  user?.role === "FREELANCER"
                    ? "/user-profile"
                    : "/user-profile/:id"
                }
                element={<UserProfile />}
              />
              <Route
                  path={"/admin"}
                  element={<Admin />}
              />
              <Route path={"/client-profile"} element={<ClientProfile />} />
              <Route path={"/client-profile/:id"} element={<ClientProfile />} />
              <Route path={"/upload-job"} element={<UploadJob />} />
              <Route path={"/job-detail/:id"} element={<JobDetail />} />
              <Route path={"/job-progress/:id"} element={<JobProgress />} />
            </Route>
            <Route path="/about-us" element={<About />} />
            <Route path="/user-auth" element={<Auth />} />
          </Routes>
        </main>
        {user && <Footer />}
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;