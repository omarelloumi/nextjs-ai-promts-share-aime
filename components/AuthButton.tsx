"use client"

import { useState } from "react";
import Register from "./forms/Register";
import Login from "./forms/Login";

const SigninButton = () => {
  const [authModal, setAuthModal] = useState("");

  return (
  <>
    <button onClick={() =>setAuthModal("login")} className="bg-purple-600 hover:bg-purple-800 transition text-white rounded-2xl py-2 px-4">
      Sign In
    </button>

    {/* Register modal */}
    {authModal == "register" && (
      <Register setAuthModal={setAuthModal}/>
    )}

    {/* Register modal */}
    {authModal == "login" && (
      <Login setAuthModal={setAuthModal}/>
    )}


  </>

  );
};

export default SigninButton;
