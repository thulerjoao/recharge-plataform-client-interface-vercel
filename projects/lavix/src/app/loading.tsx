"use client";

import { useAuth } from "contexts/auth";
import React from "react";
import "./globals.css";

const Loading = ({ children }: { children: React.ReactNode }) => {
  const { checkingToken } = useAuth();
  if (checkingToken) {
    return (
      <div className="container">
        <span className="loading" />
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
