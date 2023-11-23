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
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className=" flex  border border-black bg-black p-3 lg:px-4 lg:py-6 text-[#737373] 
      lg:flex-col
      lg:h-screen
      lg:sticky lg:left-0 lg:top-0
      justify-between
      lg:justify-start

    "
    >
      {/* <div className="lg:h-screen lg:flex lg:flex-col"> */}
      <div className="  ">
        <Link href="/" className="flex gap-2  items-center text-2xl  font-bold cursor-pointer ">
          <span>CVSCO</span>
        </Link>
      </div>
      <h1
        className="text-xl font-bold lg:hidden cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      >
        --
      </h1>
      <div
        className={` ${open && "hidden "}   lg:flex lg:flex-col h-full gap-4 lg:gap-0 lg:items-center  lg:mt-10
        ${!open && "flex flex-col absolute lg:relative top-14 h-fit left-0 p-4 lg:p-0 lg:h-full lg:left-0 lg:top-0 bg-black w-full   "}
        `}
      >
        {/* middle */}
        <div className=" flex flex-col  gap-3 font-semibold ">
          <div className="flex gap-2  items-center cursor-pointer   ">
            <IoEarthOutline className="w-6 h-6" />
            <span>Explore</span>
          </div>
          <Link href="/profile" shallow={true} className="flex gap-2  items-center cursor-pointer  ">
            <CgProfile className="w-6 h-6" />
            <span>Profile</span>
          </Link>
        </div>
        {/* bottom */}
        <div className=" flex flex-col lg:mt-[40rem]   gap-3 font-semibold   ">
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
      {/* </div> */}
    </div>
  );
};

export default Sidebar;
