import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if(result.success){
      const { JWT, full_name, email, user_name, profile_picture } = result.data;
  
      localStorage.setItem("JWT", JWT);
      localStorage.setItem("full_name", full_name);
      localStorage.setItem("email", email);
      localStorage.setItem("user_name", user_name);
      localStorage.setItem("profile_picture", profile_picture);
      navigate("/main");
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
            {/* <label className="errorLabel">{emailError}</label> */}
          </div>
          <br />
          <div className="w-2/3 m-auto">
            <label className="block text-start mb-1">Password</label>
            <input
              value={password}
              placeholder="Enter your password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className="bg-ternary border border-gray-400 p-2 rounded w-full"
            />
            {/* <label className="errorLabel">{passwordError}</label> */}
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
