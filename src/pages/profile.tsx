/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import useCurrentUser from "../../lib/useCurrentUser";
import axios from "axios";
import { UploadButton, UploadDropzone } from "../components/uploadthing";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { IoIosClose } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { useForm } from "react-hook-form";

interface ImageData {
  url: string;
}

interface FormData {
  newName: string;
  newBio: string;
}

const Profile = () => {
  const user = useCurrentUser();
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [newImage, setNewImage] = useState<string>("");
  const [ppUpload, setPpUpload] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const notify = () => toast("Upload Successful!");
  console.log(user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const handleBeforeUploadBegin = (files: File[]) => {
    // Show a confirmation dialog here or any custom logic
    const userConfirmed = window.confirm("Do you want to upload the selected image?");

    if (userConfirmed) {
      console.log("Files to upload: ", files[0].name);
      return files;
    } else {
      return [];
    }
  };

  const handleClientUploadComplete = async (res: ImageData[]) => {
    console.log(res[0].url);
    setUploadUrl(res[0].url);
    await uploadpic();
    setShowUpload(false);
    await mutate("/api/user");
  };

  const handleUploadError = (error: Error) => {
    alert(`ERROR! ${error.message}`);
  };

  const uploadpic = async () => {
    await axios.post("/api/uploadPic", { uploadUrl, userId: user.data.id });
    notify();
  };

  const updateProfilePic = async () => {
    await axios.post("/api/imageUpdate", { newImage, userId: user.data.id });
  };

  const updateInfo = async (data: FormData) => {
    await axios.post("/api/infoUpdate", { newName: data.newName, newBio: data.newBio, userId: user.data.id });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setValue("newName", user?.data?.name || "");
    setValue("newBio", user?.data?.bio || "");
    setIsEditing(!isEditing);
  };

  if (!user.data) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="mt-10 flex flex-col justify-center items-center gap-4">
        <div className="relative flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <img src={user?.data?.image} alt="pp" className="rounded-full w-32 flex items-center justify-center" />
          {isHovered && (
            <MdOutlineEdit
              className="absolute inset-0 m-auto text-white cursor-pointer"
              onClick={() => {
                setPpUpload(true);
              }}
            />
          )}
        </div>
        {ppUpload && (
          <div className="flex gap-1 ">
            <UploadButton
              endpoint="imageUploader"
              //@ts-ignore
              onClientUploadComplete={async (res) => {
                console.log(res[0].url);
                setNewImage(res[0].url);
                updateProfilePic();
                setPpUpload(false);
                mutate("/api/user");
              }}
              onUploadError={handleUploadError}
            />
            <IoIosClose
              className="self-start cursor-pointer h-6 w-6"
              onClick={() => {
                setPpUpload(false);
              }}
            />
          </div>
        )}
        {!isEditing && (
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold">{user?.data?.name}</h1>
            <h1 className="text-[#737373]">{user?.data?.bio}</h1>
            <MdOutlineEdit onClick={handleEdit} />
          </div>
        )}

        {isEditing && (
          <form className="flex flex-col justify-center items-center gap-2" onSubmit={handleSubmit(updateInfo)}>
            <input className="border border-[#737373] rounded-lg px-2 py-1" placeholder="New Name" {...register("newName", { required: true })} />
            <textarea className="border border-[#737373] rounded-lg px-2 py-1" placeholder="New Bio" {...register("newBio", { required: true })} />
            <div className="flex gap-2">
              <button type="submit" className="bg-black px-2 py-1 rounded-lg text-white font-semibold">
                Update Info
              </button>
              <button
                className="bg-black px-2 py-1 rounded-lg text-white font-semibold"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="flex flex-col justify-center items-center gap-4 mt-4">
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
          <div className="px-6 py-6 flex flex-col border border-[#737373] rounded-lg">
            <div className="flex justify-between ">
              <IoIosClose
                className="self-start cursor-pointer h-6 w-6"
                onClick={() => {
                  setShowUpload(false);
                }}
              />
              <UploadDropzone endpoint="imageUploader" onBeforeUploadBegin={handleBeforeUploadBegin} onClientUploadComplete={handleClientUploadComplete} onUploadError={handleUploadError} />
              <IoIosClose
                className="self-start h-6 w-6 cursor-pointer"
                onClick={() => {
                  setShowUpload(false);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="columns-1 md:columns-3 lg:columns-4 lg:columns-5ry px-2 mt-10 ">
        {user && user?.data?.pics.map((item: ImageData, index: number) => <img key={index} className="w-80 p-2 mb-2" src={item.url} />).reverse()}
      </div>
    </div>
  );
};

export default Profile;
