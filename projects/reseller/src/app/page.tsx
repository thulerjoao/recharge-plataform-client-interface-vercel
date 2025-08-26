"use client";

import { useAuth } from "context/auth";
import { useRouter } from "next/navigation";
import Login from "public/components/login";
import { useEffect } from "react";
import "./globals.css";

const Page = () => {
  const route = useRouter();
  const { logged } = useAuth();

  useEffect(() => {
    if (logged) route.replace("/products");
  }, [logged, route]);
  return (
    <div className="container">
      <Login />
    </div>
  );
};

export default Page;
