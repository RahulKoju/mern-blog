import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return setErrorMessage("Please enter your email address.");
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setErrorMessage(data.message || "An error occurred");
      } else {
        setSuccessMessage("Password reset link has been sent to your email.");
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000); // Redirect to sign-in after 3 seconds
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex mx-auto max-w-3xl flex-col md:flex-row md:items-center gap-5 p-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Rahul's
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">
            Please enter your email address. You will receive a link to create a
            new password via email.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Enter your email" />
              <TextInput
                type="email"
                id="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
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
                "Send Reset Link"
              )}
            </Button>
          </form>
          <div className="flex gap-1 text-sm mt-4">
            <span>Remember your password?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          <div className="h-10 mt-5">
            {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
            {successMessage && <Alert color="success">{successMessage}</Alert>}
          </div>
        </div>
      </div>
    </div>
  );
}
