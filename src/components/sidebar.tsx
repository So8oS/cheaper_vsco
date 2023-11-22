import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoEarthOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div className=" flex flex-col justify-between border border-black bg-black px-4 py-6 text-[#737373] h-screen  ">
      <div className="  ">
        <Link href="/" className="flex gap-2  items-center text-2xl  font-bold cursor-pointer ">
          <span>CVSCO</span>
        </Link>
      </div>
      {/* middle */}
      <div className=" flex flex-col  gap-3 font-semibold ">
        <div className="flex gap-2  items-center cursor-pointer   ">
          <IoEarthOutline className="w-6 h-6" />
          <span>Explore</span>
        </div>

        <Link href="/profile" className="flex gap-2  items-center cursor-pointer  ">
          <CgProfile className="w-6 h-6" />
          <span>Profile</span>
        </Link>
      </div>

      {/* bottom */}
      <div className=" flex flex-col  gap-3 font-semibold   ">
        {session && (
          <div
            className="flex gap-2  items-center cursor-pointer   "
            onClick={() => {
              signOut({
                callbackUrl: "/",
              });
            }}
          >
            <FaSignOutAlt className="w-6 h-6" />
            <span>Logout</span>
          </div>
        )}
        <div className="flex gap-2  items-center cursor-pointer   ">
          <BsSearch className="w-6 h-6" />
          <span>Search</span>
        </div>
        <div className="flex gap-2  items-center cursor-pointer   ">
          <MdOutlineSettings className="w-6 h-6" />
          <span>Account</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
