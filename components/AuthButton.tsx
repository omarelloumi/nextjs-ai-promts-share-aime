"use client"

import { useState } from "react";
import Register from "./forms/Register";

const SigninButton = () => {
  const [authModal, setAuthModal] = useState(false);

  return (
  <>
    <button onClick={() =>setAuthModal(true)} className="bg-purple-600 hover:bg-purple-800 transition text-white rounded-2xl py-2 px-4">
      Sign In
    </button>

    {/* Authentication modal */}
    {authModal && (
      <Register setModal={setAuthModal}/>
    )}
  </>

  );
};

export default SigninButton;
