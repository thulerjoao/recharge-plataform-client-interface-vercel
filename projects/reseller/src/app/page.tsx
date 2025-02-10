"use client";

import { useRouter } from "next/navigation";
import Login from "public/components/login";
import "./globals.css";

const Page = () => {
  const route = useRouter();
  return (
    <div className="container">
      {/* <span className="loading" /> */}
      <Login />
    </div>
  );
};

export default Page;
