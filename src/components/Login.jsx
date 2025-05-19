import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { BACKEND_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onButtonClick = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate inputs
    if (!email) {
      setEmailError("Please enter your email");
      return;
    }
    if (!password) {
      setPasswordError("Please enter your password");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (result.success) {
        const userData = result.data;
        // Store in localStorage, handle null values
        Object.entries(userData).forEach(([key, value]) => {
          if (value === null) {
            localStorage.setItem(key, ''); // Store empty string instead of 'null'
          } else {
            localStorage.setItem(key, value);
          }
        });
        // Update Redux store with properly handled null values
        dispatch(setUser({
          ...userData,
          profile_picture: userData.profile_picture || '' // Convert null to empty string
        }));
        navigate("/main");
      } else {
        setPasswordError(result.message || "Invalid credentials");
      }
    } catch (error) {
      setPasswordError("An error occurred. Please try again.");
    }
  };

  const navToSignup = () =>{
    navigate("/signup")
  }

  return (
    <div className="flex justify-center items-center  h-screen ">
      <div className="w-2/3 h-3/4 rounded-lg border-2 border-solid border-border flex jsutify-between items-center bg-secondary">
        <div className=" text-lg font-bold w-full text-center">
          Welcome to View Hub
        </div>
        <div className="w-full text-center">
          <div className="w-2/3 m-auto">
            <label className="block text-start mb-1">Email</label>
            <input
              value={email}
              placeholder="Enter your email here"
              onChange={(ev) => setEmail(ev.target.value)}
              className="bg-ternary border border-gray-400 p-2 rounded w-full"
            />
            {emailError && <label className="text-red-500 text-sm block text-start">{emailError}</label>}
          </div>
          <br />
          <div className="w-2/3 m-auto">
            <label className="block text-start mb-1">Password</label>
            <input
              value={password}
              type="password"
              placeholder="Enter your password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className="bg-ternary border border-gray-400 p-2 rounded w-full"
            />
            {passwordError && <label className="text-red-500 text-sm block text-start">{passwordError}</label>}
          </div>
          <br />
          <div className="mx-auto w-2/3 flex justify-between items-baseline">
            <div onClick={navToSignup} className="underline items-baseline cursor-pointer">signup</div>
            <button
              onClick={onButtonClick}
              className="w-1/3 rounded p-2 bg-blue-700 text-white"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
