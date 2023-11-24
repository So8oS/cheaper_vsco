/* eslint-disable @next/next/no-img-element */
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import useUsers from "../../lib/useUsers";
import React from "react";

export default function Home() {
  const users = useUsers();
  const [set, setSet] = React.useState("s");

  return (
    <div className="flex flex-col justify-center items-center p-2">
      <div
        className="p-3 border border-black rounded-full  flex items-center justify-center cursor-pointer gap-2 "
        onClick={() => {
          signIn("google", {
            callbackUrl: "/profile",
          });
        }}
      >
        <h1>Sign in with</h1>
        <FcGoogle />
      </div>

      {//@ts-ignore
      users?.data?.map((user) => {
        return (
          <div key={user.id} className="flex flex-col self-start">
            <div className="flex gap-2 items-center">
              <img src={user?.image} alt="" className="w-12 rounded " />
              <h1 className="font-semibold">{user.name}</h1>
            </div>
            <div className={`flex justify-start lg:gap-10 gap-5 max-w-screen overflow-scroll md:overflow-auto py-4 `}>
              {//@ts-ignore
              user?.pics
                ?.map((pic) => {
                  return <img key={pic.id} src={pic.url} alt="" className="w-72 h-60 md:w-60  object-cover lg:hover:max-w-2xl lg:hover:h-auto" />;
                })
                .slice(0, 4)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
