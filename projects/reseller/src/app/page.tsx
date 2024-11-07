"use client";

import LoginModal from "@4miga/design-system/components/loginModal";
import { useRouter } from "next/navigation";
import "./globals.css";

const Page = () => {
  const route = useRouter();
  return (
    <div className="container">
      {/* <span className="loading" /> */}
      <LoginModal reseller handleLogin={() => route.replace("/home")} />
    </div>
  );
};

export default Page;
