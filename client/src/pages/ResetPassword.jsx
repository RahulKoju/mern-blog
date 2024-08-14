import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return setError("Please Fill out all the feilds");
    }
    setLoading(true);
    setError("");
    setMessage("");
    // Check if passwords match
    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password , confirmPassword }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.message || "An error occurred");
      } else {
        setMessage("Password has been reset. Redirecting to login...");
        setTimeout(() => navigate("/sign-in"), 3000);
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred, please try again later.");
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex mx-auto max-w-3xl flex-col md:flex-row md:items-center gap-5 p-5">
        {/* left */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold">Reset Password</h1>
          <p className="mt-5 text-sm">
            Enter your new password below to reset your account password.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="password" value="New Password" />
              <TextInput
                type="password"
                id="password"
                placeholder="*******"
                onChange={handlePasswordChange}
                value={password}
                aria-required="true"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" value="Confirm Password" />
              <TextInput
                type="password"
                id="confirmPassword"
                placeholder="*******"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                aria-required="true"
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
          <div className="h-10 mt-5">
            {error && <Alert color="failure">{error}</Alert>}
            {message && <Alert color="success">{message}</Alert>}
          </div>
        </div>
      </div>
    </div>
  );
}
