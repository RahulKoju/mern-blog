import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
export default function OAuth() {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    dispatch(signInStart());
    window.open("http://localhost:8000/api/auth/google", "_self");
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/auth/login/success",
          {
            credentials: "include",
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          dispatch(signInSuccess(data.user));
        } else {
          dispatch(signInFailure("Failed to authenticate"));
        }
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    };
    fetchUser();
  }, [dispatch]);
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
