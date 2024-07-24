import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex mx-auto max-w-3xl flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Rahul's
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Username" />
              <TextInput type="text" id="username" placeholder="Username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="text" id="email" placeholder="example@gmail.com" />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" id="password" placeholder="Password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">Sign Up</Button>
            <div className="flex gap-1 text-sm">
              <span>Have an account?</span>
              <Link to="/sign-in" className="text-blue-500">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
