/* eslint-disable @next/next/no-img-element */
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import useUsers from "../../lib/useUsers";
import React from "react";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  image: string;
  pics: { id: string; url: string }[];
}

export default function Home() {
  const users = useUsers();

  return (
    <div className="flex flex-col justify-center items-center p-2">
      {users?.data?.map((user: User) => {
        return (
          <div key={user.id} className="flex flex-col self-start">
            <Link href={`/${user.id}`} className="flex gap-2 items-center">
              <img src={user?.image} alt="" className="w-12 rounded" />
              <h1 className="font-semibold">{user.name}</h1>
            </Link>
            <div className={`flex justify-start lg:gap-10 gap-5 max-w-screen overflow-scroll md:overflow-auto py-4 `}>
              {user?.pics
                ?.map((pic: { id: string; url: string }) => {
                  return <img key={pic.id} src={pic.url} alt="" className="w-72 h-60 md:w-60  object-cover " />;
                })
                .slice(0, 4)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
