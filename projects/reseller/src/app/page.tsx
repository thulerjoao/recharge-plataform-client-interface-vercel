"use client";

import { useAuth } from "context/auth";
import Login from "public/components/login";
import "./globals.css";

const Page = () => {
  const { logged } = useAuth();

  if (!logged) {
    return (
      <div className="container">
        <Login />
      </div>
    );
  }
};

export default Page;
