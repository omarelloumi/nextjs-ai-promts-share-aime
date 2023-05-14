"use client"

import { signIn, signOut, useSession } from "next-auth/react"

const SigninButton = () => {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
    <button onClick={() =>signOut()} className="bg-red-600 hover:bg-red-800 transition text-white rounded-2xl py-2 px-4">
          Sign Out
    </button>
    );
  }
  return (
    <button onClick={() => signIn()} className="bg-blue-600 hover:bg-blue-800 transition text-white rounded-2xl py-2 px-4">
      Sign In
    </button>
  );
};

export default SigninButton;
