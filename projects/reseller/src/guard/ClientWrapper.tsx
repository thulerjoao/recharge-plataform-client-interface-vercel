"use client";

import { useAuth } from "context/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logged } = useAuth();
  const route = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    if (!logged && currentPath !== "/") {
      route.replace("/");
    }
  }, [logged, currentPath, route]);

  if (!logged && currentPath !== "/") {
    return null;
  }

  return <>{children}</>;
}
