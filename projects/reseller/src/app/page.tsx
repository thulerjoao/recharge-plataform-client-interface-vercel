"use client";

import { useAuth } from "context/auth";
import Login from "public/components/login";
import "./globals.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const route = useRouter();
  const { logged } = useAuth();

  if (!logged) {
    return (
      <div className="container">
        <Login />
      </div>
    );
  } else {
    route.replace("/dashboard");
  }
};

export default Page;
