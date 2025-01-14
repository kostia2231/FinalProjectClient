import { Outlet, Navigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

const ProtectedRoutes = () => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setIsVerified(false);
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:3333/auth/protected`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setIsVerified(response.data);
      } catch (err) {
        console.error("verification error:", (err as AxiosError).message);
        setIsVerified(false);
      }
    };

    verify();
  }, [token]);

  if (isVerified === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return isVerified ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
