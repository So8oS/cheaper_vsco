import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex justify-between">
      <SessionProvider session={pageProps.session}>
        <Sidebar />
        <div className="w-full mt-10 mb-10">
          <div className="flex flex-col justify-center items-center">
            <Component {...pageProps} />
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </SessionProvider>
    </div>
  );
}
