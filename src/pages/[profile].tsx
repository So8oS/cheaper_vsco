/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

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

  if (!user) return;
  <div>
    <p>loading...</p>
  </div>;

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

      <div className="columns-1 md:columns-3 lg:columns-4 lg:columns-5ry px-2 mt-10 ">
        {user && user?.pics.map((item: ImageData, index: number) => <img key={index} className="w-80 p-2 mb-2" src={item.url} />).reverse()}
      </div>
    </div>
  );
};

export default Profile;
