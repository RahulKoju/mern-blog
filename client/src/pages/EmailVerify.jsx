import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";

export default function EmailVerify () {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email/${token}`, {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(data.message);
          setTimeout(() => navigate("/sign-in"), 3000);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Verification failed. Please try again.");
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="max-w-md mx-auto">
      {message && <Alert color="success">{message}</Alert>}
      {error && <Alert color="failure">{error}</Alert>}
    </div>
  );
};
