/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAuth } from "context/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { logged } = useAuth();
  // const route = useRouter();
  // const currentPath = usePathname();
  // const publicRoutes = ["/"];

  // useEffect(() => {
  //   if (!logged && !publicRoutes.includes(currentPath)) {
  //     route.replace("/");
  //   }
  // }, [currentPath, logged, publicRoutes, route]);

  // if (!logged && currentPath !== "/") {
  //   return null;
  // }

  return <>{children}</>;
}
