"use client";

import LoadingPage from "app/loading";
import { useAuth } from "context/auth";
import Login from "public/components/login";
import "./globals.css";

const Page = () => {
  const { logged, checkingToken } = useAuth();

  if (checkingToken) {
    return <LoadingPage />;
  }

  if (!logged) {
    return (
      <div className="container">
        <Login />
      </div>
    );
  }
};

export default Page;
