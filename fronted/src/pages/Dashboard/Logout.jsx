import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Logout = () => {
    useUserAuth()
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove token
    localStorage.removeItem("token");

    // 2. Redirect to login
    navigate("/login");

    // 3. Optional message
    console.log("User logged out");
  };

  return (<DashboardLayout activeMenu="Logout"> 
    <button
      onClick={handleLogout}
      className="bg-purple-500 text-white mt-5 px-4 py-2 rounded"
    >
      Logout
    </button>
    </DashboardLayout>
  );
};

export default Logout;