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
import { IoIosCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";

interface ImageData {
  url: string;
  id: string;
  createdAt: string;
}

interface FormData {
  newName: string;
  newBio: string;
}

interface UserProfile {
  image: string;
  name: string;
  bio: string;
  pics: ImageData[];
}

const Profile = () => {
  const user = useCurrentUser();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [ppUpload, setPpUpload] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const UploadNotify = () => toast("Upload Successful!");
  const ppUpdateNotify = () => toast("Profile Picture Updated!");
  const picturedeleteNotify = () => toast("Picture Deleted!");
  const [selectedPhoto, setSelectedPhoto] = useState<ImageData>();
  const [viewPhoto, setViewPhoto] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const handleBeforeUploadBegin = (files: File[]) => {
    const userConfirmed = window.confirm("Do you want to upload the selected image?");
    if (userConfirmed) {
      return files;
    } else {
      return [];
    }
  };

  const handleClientUploadComplete = async (res: ImageData[]) => {
    await uploadpic(res[0].url);
    setShowUpload(false);
    await mutate("/api/user");
  };

  const handleUploadError = (error: Error) => {
    alert(`ERROR! ${error.message}`);
  };

  const uploadpic = async (url: string) => {
    await axios.post("/api/uploadPic", { uploadUrl: url, userId: user.data.id });
    UploadNotify();
  };

  const updateProfilePic = async (newPic: string) => {
    await axios.post("/api/imageUpdate", { newImage: newPic, userId: user.data.id });
    ppUpdateNotify();
  };

  const updateInfo = async (data: FormData) => {
    await axios.post("/api/infoUpdate", { newName: data.newName, newBio: data.newBio, userId: user.data.id });
    setIsEditing(false);
    await mutate("/api/user");
  };

  const handleEdit = () => {
    setValue("newName", user?.data?.name || "");
    setValue("newBio", user?.data?.bio || "");
    setIsEditing(!isEditing);
  };

  /* @ts-ignore */
  const handleDelete = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this image?");

    if (userConfirmed) {
      await axios.post("/api/deletePic", { picId: id });
      await mutate("/api/user");
      picturedeleteNotify();
    } else {
      return;
    }
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
          {user?.data?.image ? (
            <img src={user?.data?.image} alt="pp" className="rounded-full w-32 flex items-center justify-center" />
          ) : (
            <img src="/user.png" alt="pp" className="rounded-full w-32 flex items-center justify-center" />
          )}
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
                updateProfilePic(res[0].url);
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
            {user?.data?.bio ? <h1 className="text-[#737373]">{user?.data?.bio}</h1> : <h1 className="text-[#737373]">Add bio</h1>}
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
              {/* @ts-ignore */}
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

      {viewPhoto && (
        <div className="bg-slate-300 rounded  fixed  m-auto top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center  border border-black ">
          {/* @ts-ignore */}
          <img src={selectedPhoto?.url} className="w-auto p-1  max-h-[85%] " />
          <div className="flex justify-center items-center gap-2 w-full  ">
            <MdDelete
              onClick={() => {
                /* @ts-ignore */

                handleDelete(selectedPhoto.id);
                setViewPhoto(false);
              }}
              className=" cursor-pointer h-6 w-6  "
            />

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
      <div className="columns-1 md:columns-3 lg:columns-4 lg:columns-5ry px-2 mt-10 ">
        {user &&
          user?.data?.pics
            .map((item: ImageData, index: number) => (
              <img
                onClick={() => {
                  /* @ts-ignore */
                  setSelectedPhoto(item);
                  setViewPhoto(true);
                }}
                key={index}
                className="w-80 p-2 mb-2 cursor-pointer rounded-sm "
                src={item.url}
              />
            ))
            .reverse()}
      </div>
    </div>
  );
};

export default Profile;
