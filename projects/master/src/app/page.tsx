"use client";

import LoginModal from "@4miga/design-system/components/loginModal";
import { useRouter } from "next/navigation";
import "./globals.css";
import Login from "public/components/login";

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
