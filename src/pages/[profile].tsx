/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { IoIosCloseCircle } from "react-icons/io";

interface ImageData {
  url: string;
}

interface UserProfile {
  image: string;
  name: string;
  bio: string;
  pics: ImageData[];
}

const Profile = () => {
  const router = useRouter();
  const id = router.query.profile;
  const [user, setUser] = React.useState<UserProfile | null>(null); // Provide the type here
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [viewPhoto, setViewPhoto] = useState<boolean>(false);

  const get = async () => {
    try {
      const res = await axios.post("/api/getProfile", { id });
      setUser(res.data.result);
    } catch (error) {
      console.error("Error getting profile:", error);
    }
  };

  React.useEffect(() => {
    get();
  }, [id]);

  if (!user)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="mt-10 flex flex-col justify-center items-center gap-4">
        <div className="relative flex items-center">
          <img src={user?.image} alt="pp" className="rounded-full w-32 flex items-center justify-center" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold">{user?.name}</h1>
          <h1 className="text-[#737373]">{user?.bio}</h1>
        </div>
      </div>
      {viewPhoto && (
        <div className="bg-slate-300 rounded  fixed  m-auto top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center  border border-black ">
          {/* @ts-ignore */}
          <img src={selectedPhoto.url} className="w-auto p-1  max-h-[85%] " />
          <div className="flex flex-col justify-center items-center gap-2 w-full  bg-slate-100">
            <IoIosCloseCircle
              onClick={() => {
                setViewPhoto(false);
              }}
              className=" cursor-pointer h-6 w-6 m-3 "
            />
          </div>
        </div>
      )}

      <div className="columns-1 md:columns-3 lg:columns-4 lg:columns-5ry px-2 mt-10 ">
        {user &&
          user?.pics
            .map((item: ImageData, index: number) => (
              <img
                onClick={() => {
                  /* @ts-ignore */
                  setSelectedPhoto(item);
                  setViewPhoto(true);
                }}
                key={index}
                className="w-80 p-2 mb-2"
                src={item.url}
              />
            ))
            .reverse()}
      </div>
    </div>
  );
};

export default Profile;
