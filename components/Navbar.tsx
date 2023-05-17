"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import AuthButton from "./AuthButton";

const Navbar = () => {
    const { data: session } = useSession()
  return (
    <nav className="bg-slate-200 dark:bg-slate-400 border-b border-slate-600 px-4">
        <div className="container flex items-center justify-between mx-auto">
            <Link href="/">
                <Logo />
            </Link>
            <div className="flex items-center md:order-2 gap-3 md:gap-6">
                {
                    session && session.user ? (
                        <>
                            <Link href="/prompts/create">
                                <button className="bg-white hover:bg-black transition text-black hover:text-white border border-black rounded-2xl py-2 px-3 md:px-6">
                                    Share a prompt
                                </button>
                            </Link>
                            <ProfileMenu />
                        </>
                    ) : (
                        <AuthButton />
                    )
                }
            </div>
        </div>
    </nav>
  )
}

export default Navbar
