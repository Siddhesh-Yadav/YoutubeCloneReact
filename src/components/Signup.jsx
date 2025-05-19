import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constants";

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    user_name: "",
    password: "",
    profile_picture: "",
  });
  
  const [errors, setErrors] = useState({
    full_name: "",
    email: "",
    user_name: "",
    password: "",
    profile_picture: "",
  });

  const updateStateKey = (key, value) => {
    setFormData((prevState) => ({
      ...prevState, // Spread the previous state
      [key]: value, // Update the specific key
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      full_name: "",
      email: "",
      user_name: "",
      password: "",
      profile_picture: "",
    };

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.user_name.trim()) {
      newErrors.user_name = "Username is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.profile_picture.trim()) {
      newErrors.profile_picture = "Profile picture URL is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const navigate = useNavigate();

  const onButtonClick = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(`${BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        navigate("/login");
      } else {
        setErrors(prev => ({...prev, email: result.message || "Signup failed"}));
      }
    } catch (error) {
      setErrors(prev => ({...prev, email: "An error occurred. Please try again."}));
    }
  };

  const navToLogin = () =>{
    navigate("/login")
  }
  return (
    <div className="flex justify-center items-center  h-screen ">
      <div className="w-2/3 h-3/4 rounded-lg border-2 border-solid border-border flex jsutify-between items-center bg-secondary">
        <div className=" text-lg font-bold w-full text-center">
          Welcome to View Hub
        </div>
        <div className="w-full text-center">
          <div className="w-2/3 m-auto">
            <label className="block text-start mb-1">Full name</label>
            <input
              value={formData.full_name}
              placeholder="Enter your full name here"
              onChange={(ev) => updateStateKey("full_name", ev.target.value)}
              className="bg-ternary border border-gray-400 p-2 rounded w-full"
            />
            {errors.full_name && <div className="text-red-500 text-sm text-left mt-1">{errors.full_name}</div>}
          </div>
          <br />
          <div className="w-2/3 m-auto">
            <label className="block text-start mb-1">Email</label>
            <input
              value={formData.email}
              placeholder="Enter your email here"
              onChange={(ev) => updateStateKey("email", ev.target.value)}
              className="bg-ternary border border-gray-400 p-2 rounded w-full"
            />
            {errors.email && <div className="text-red-500 text-sm text-left mt-1">{errors.email}</div>}
          </div>
          <div className="w-2/3 m-auto">
            <label className="block text-start mb-1">username</label>
            <input
              value={formData.user_name}
              placeholder="Enter your username here"
              onChange={(ev) => updateStateKey("user_name", ev.target.value)}
              className="bg-ternary border border-gray-400 p-2 rounded w-full"
            />
            {errors.user_name && <div className="text-red-500 text-sm text-left mt-1">{errors.user_name}</div>}
          </div>
          <div className="w-2/3 m-auto">
            <label className="block text-start mb-1">password</label>
            <input
              type="password"
              value={formData.password}
              placeholder="Enter your password here"
              onChange={(ev) => updateStateKey("password", ev.target.value)}
              className="bg-ternary border border-gray-400 p-2 rounded w-full"
            />
            {errors.password && <div className="text-red-500 text-sm text-left mt-1">{errors.password}</div>}
          </div>
          <div className="w-2/3 m-auto">
            <label className="block text-start mb-1">Profile Picture</label>
            <input
              value={formData.profile_picture}
              placeholder="Enter profile picture URL"
              onChange={(ev) => updateStateKey("profile_picture", ev.target.value)}
              className="bg-ternary border border-gray-400 p-2 rounded w-full"
            />
            {errors.profile_picture && <div className="text-red-500 text-sm text-left mt-1">{errors.profile_picture}</div>}
          </div>
          <br />
          <div className="mx-auto w-2/3 flex justify-between items-baseline">
            <div onClick={navToLogin} className="underline items-baseline cursor-pointer">login</div>
            <button
              onClick={onButtonClick}
              className="w-1/3 rounded p-2 bg-blue-700 text-white"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
