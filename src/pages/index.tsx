/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useUsers from "../../lib/useUsers";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IoIosCloseCircle } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface User {
  id: string;
  name: string;
  image: string;
  email: string;
  pics: { id: string; url: string; createdAt: string }[];
}
interface ImageData {
  url: string;
  id: string;
  createdAt: string;
}
export default function Home() {
  const users = useUsers();
  const { data: session } = useSession();
  const [selectedPhoto, setSelectedPhoto] = useState<ImageData>();
  const [viewPhoto, setViewPhoto] = useState<boolean>(false);
  const [sliceCount, setSliceCount] = useState<number>(2);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center p-2">
      <h1 className="text-5xl font-bold">CVSCO</h1>
      <p className="text-3xl font-semibold">Share your moments</p>

      <p className="self-start font-semibold text-2xl mt-10 mb-4">See what others shared!</p>
      {viewPhoto && (
        <div className="bg-slate-300 rounded  fixed  m-auto top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center  border border-black ">
          {/* @ts-ignore */}
          <img src={selectedPhoto.url} className="w-auto p-1  max-h-[85%] " />
          <div className="flex flex-col justify-center items-center gap-2 w-full  ">
            <IoIosCloseCircle
              onClick={() => {
                setViewPhoto(false);
              }}
              className=" cursor-pointer h-6 w-6 m-3 "
            />
          </div>
          <h1>{`${selectedPhoto?.createdAt.slice(0, 10)}`}</h1>
        </div>
      )}
      {!users.data ? (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <span className="loader"></span>
        </div>
      ) : (
        users?.data
          ?.map((user: User) => {
            if (user.email == session?.user?.email) return null;
            if (user.pics.length < 2) return null;
            return (
              <div key={user.id} className="flex flex-col self-start">
                <Link href={`/${user.id}`} className="flex gap-2 items-center">
                  <img src={user?.image} alt="" className="w-12 rounded" />
                  <h1 className="font-semibold">{user.name}</h1>
                </Link>
                <div className={`flex justify-start lg:gap-10 gap-5 max-w-screen overflow-scroll md:overflow-auto py-4 `}>
                  {user?.pics
                    ?.map((pic: { id: string; url: string }) => {
                      return (
                        <img
                          onClick={() => {
                            /* @ts-ignore */
                            setSelectedPhoto(pic);
                            setViewPhoto(true);
                          }}
                          key={pic.id}
                          src={pic.url}
                          alt="pic"
                          className="w-72 h-60 md:w-60  object-cover cursor-pointer rounded-sm "
                        />
                      );
                    })
                    .slice(0, 4)}
                </div>
              </div>
            );
          })
          .reverse()
          .slice(0, sliceCount)
      )}
      {sliceCount < users.data?.length && (
        <button
          onClick={() => {
            setSliceCount(sliceCount + 5);
          }}
          className="bg-slate-300 rounded-md p-2 mt-4"
        >
          Load more
        </button>
      )}
        {/* <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-5xl flex justify-center items-center">Site under maintenance </DialogTitle>
     
    </DialogHeader>
  </DialogContent>
</Dialog> */}
    </div>
  );
}
