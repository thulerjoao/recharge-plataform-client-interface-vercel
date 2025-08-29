/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import LoadingPage from "app/loading";
import { useAuth } from "context/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logged, checkingToken } = useAuth();
  const route = useRouter();
  const currentPath = usePathname();
  const publicRoutes = ["/"]; // Public routes have to be put here

  useEffect(() => {
    if (!checkingToken && !logged && !publicRoutes.includes(currentPath)) {
      route.replace("/");
    }
  }, [currentPath, logged, checkingToken, publicRoutes, route]);

  if (checkingToken) {
    return <LoadingPage />;
  }

  if (!logged && currentPath !== "/") {
    return null;
  }

  return <>{children}</>;
}
