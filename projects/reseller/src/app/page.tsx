"use client";

import LoginModal from "@4miga/design-system/components/loginModal";
import { useRouter } from "next/navigation";
import "./globals.css";

const Page = () => {
  const route = useRouter();

  // useEffect(() => route.replace("/home"), [route]);
  return (
    <div className="container">
      <span className="loading" />
      <LoginModal reseller handleLogin={null} />
    </div>
  );
};

export default Page;
