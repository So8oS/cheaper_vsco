import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl">Sign up for an account</h1>
      <div
        className="p-3 mt-5 border border-black rounded-full  flex items-center justify-center cursor-pointer gap-2 "
        onClick={() => {
          signIn("google", {
            callbackUrl: "/profile",
          });
        }}
      >
        <h1>Sign in with</h1>
        <FcGoogle />
      </div>
    </div>
  );
};

export default Signin;
