/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register/Index";
import Dashboard from "../components/Dashboard";
import Logout from "../components/Logout";
import EmployeeDetails from "../components/EmployeeDetails";


const Routess = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setUserEmail={setUserEmail}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setIsAuthenticated={setIsAuthenticated}
              setUserEmail={setUserEmail}
              setUserName={setUserName}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              isAuthenticated={isAuthenticated}
              userEmail={userEmail}
              userName={userName}
            />
          }
        />

        <Route path="/logout" element={<Logout />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
};

export default Routess;
