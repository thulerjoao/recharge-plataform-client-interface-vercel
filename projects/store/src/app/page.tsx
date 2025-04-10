"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";
import { useAuth } from "contexts/auth";

const Page = () => {
  const route = useRouter();

  useEffect(() => route.replace("/home"), [route]);
  return (
    <div className="container">
      <span className="loading" />
    </div>
  );
};

export default Page;
