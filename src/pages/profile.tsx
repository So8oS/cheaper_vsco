/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import useCurrentUser from "../../lib/useCurrentUser";
import axios from "axios";
import { UploadButton, UploadDropzone } from "../components/uploadthing";
import { toast } from "react-toastify";
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";
import { mutate } from "swr";
import { IoIosClose } from "react-icons/io";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       session,
//     },
//   };
// }

const Profile = () => {
  const user = useCurrentUser();
  const [uploadUrl, setUploadUrl] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const notify = () => toast("Upload Successful!");
  const { data: session } = useSession();
  const router = useRouter();

  const handleBeforeUploadBegin = (files: File[]) => {
    // Show a confirmation dialog here or any custom logic
    const userConfirmed = window.confirm("Do you want to upload the selected image?");

    if (userConfirmed) {
      //@ts-ignore
      console.log("Files to upload: ", files[0].url);
      return files;
    } else {
      return [];
    }
  };

  const handleClientUploadComplete = async (res: any) => {
    setUploadUrl(res[0].url);
    console.log(uploadUrl);
    uploadpic();
    notify();
    mutate("/api/user");
  };

  const handleUploadError = (error: Error) => {
    alert(`ERROR! ${error.message}`);
  };

  const uploadpic = () => {
    axios.post("/api/uploadPic", { uploadUrl, userId: user.data.id });
  };

  if (!session) {
    router.push("/");
  }

  if (!user) return <div>loading</div>;

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="mt-10 flex flex-col justify-center items-center gap-4 ">
        <img src={user?.data?.image} alt="pp" className="rounded-full w-30 flex items-center justify-center " />
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold">{user?.data?.name}</h1>
          <h1 className="text-[#737373]">{user?.data?.bio}</h1>
          {/* <h1>settings</h1> */}
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center gap-4 mt-4">
        {!showUpload && (
          <button
            className="bg-black px-4 py-3 rounded-lg text-white font-semibold"
            onClick={() => {
              setShowUpload(true);
            }}
          >
            Upload An Image
          </button>
        )}
        {showUpload && (
          <div className="px-6 py-6 flex flex-col   border border-[#737373] rounded-lg">
            <div className="flex justify-between ">
              <IoIosClose
                className="self-start cursor-pointer h-6 w-6"
                onClick={() => {
                  setShowUpload(false);
                }}
              />
              <UploadButton
                className="cursor-pointer"
                endpoint="imageUploader"
                onBeforeUploadBegin={handleBeforeUploadBegin}
                onClientUploadComplete={handleClientUploadComplete}
                onUploadError={handleUploadError}
              />
              <IoIosClose
                className="self-start  h-6 w-6 cursor-pointer"
                onClick={() => {
                  setShowUpload(false);
                }}
              />
            </div>
            <UploadDropzone endpoint="imageUploader" onBeforeUploadBegin={handleBeforeUploadBegin} onClientUploadComplete={handleClientUploadComplete} onUploadError={handleUploadError} />
          </div>
        )}{" "}
      </div>

      {/* Content */}
      <div className="columns-1 md:columns-3 lg:columns-4 lg:columns-5ry px-2 mt-10 ">
        {/*   @ts-ignore */}
        {user?.data?.pics.map((item, index) => <img key={index} className=" w-80 p-2 mb-2  " src={item.url} />).reverse()}
      </div>
    </div>
  );
};

export default Profile;
