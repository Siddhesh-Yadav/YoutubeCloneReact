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
  const updateStateKey = (key, value) => {
    setFormData((prevState) => ({
      ...prevState, // Spread the previous state
      [key]: value, // Update the specific key
    }));
  };
  //   const [emailError, setEmailError] = useState("");
  //   const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
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
          </div>
          <div className="w-2/3 m-auto">
            <label className="block text-start mb-1">username</label>
            <input
              value={formData.user_name}
              placeholder="Enter your username here"
              onChange={(ev) => updateStateKey("user_name", ev.target.value)}
              className="bg-ternary border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div className="w-2/3 m-auto">
            <label className="block text-start mb-1">password</label>
            <input
              value={formData.password}
              placeholder="Enter your username here"
              onChange={(ev) => updateStateKey("password", ev.target.value)}
              className="bg-ternary border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div className="w-2/3 m-auto">
            <label className="block text-start mb-1">Profile Picture</label>
            <input
              value={formData.profile_picture}
              placeholder="Enter your username here"
              onChange={(ev) => updateStateKey("profile_picture", ev.target.value)}
              className="bg-ternary border border-gray-400 p-2 rounded w-full"
            />
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
