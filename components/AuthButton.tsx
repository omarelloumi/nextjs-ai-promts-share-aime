"use client"

import { signIn } from "next-auth/react"

const SigninButton = () => {
  return (
    <button onClick={() => signIn()} className="bg-purple-600 hover:bg-purple-800 transition text-white rounded-2xl py-2 px-4">
      Sign In
    </button>
  );
};

export default SigninButton;
