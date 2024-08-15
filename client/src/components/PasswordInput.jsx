import React, { useState } from "react";
import { TextInput } from "flowbite-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function PasswordInput({ id, placeholder, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    setPassword(e.target.value);
    onChange(e);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative">
      <TextInput
        type={showPassword ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        value={password}
      />
      {password && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
}
