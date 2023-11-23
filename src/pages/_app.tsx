import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="flex lg:flex-row flex-col  min-h-screen lg:justify-between">
        <Sidebar />
        <div className="flex flex-col justify-center items-center py-10 ">
          <Component {...pageProps} />
        </div>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </div>
    </SessionProvider>
  );
}
