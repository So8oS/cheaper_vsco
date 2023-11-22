import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
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
      <div>
        <div></div>
      </div>
    </div>
  );
}
