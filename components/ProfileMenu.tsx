"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Popup from "./modals/Popup";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignOutCancel = () => {
    setIsSignOutOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
    <div className="flex items-center relative" ref={dropdownRef}>
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className={"flex text-sm rounded-full" + (isMenuOpen && (" ring-4 ring-gray-300 dark:ring-gray-600"))}
      >
        <span className="sr-only">Open user menu</span>
        <Image
          src="/test.avif"
          alt="avatar"
          width={500}
          height={500}
          className="w-10 h-10 rounded-full"
        />
      </button>

      {/* Profile dropdown */}
      {isMenuOpen && (
        <div className="z-50 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-full">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              {session && session.user ? session.user.name : "Loading..."}
            </span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
              {session && session.user ? session.user.email : "Loading..."}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Settings
              </Link>
            </li>
            <li>
              <a
                onClick={() => setIsSignOutOpen(true)}
                className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>

    {/* Sign out confirmation */}
    {isSignOutOpen && (
      <Popup
        message="Are you sure you want to sign out?"
        onConfirm={handleSignOut}
        onCancel={handleSignOutCancel}
      />
    )}
    </>
  );
};

export default ProfileMenu;
