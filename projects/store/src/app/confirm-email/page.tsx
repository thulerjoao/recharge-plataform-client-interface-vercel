"use client";

import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { LoginResponse } from "types/loginTypes";
import { apiUrl, storeId as defaultStoreId } from "utils/apiUrl";

const ConfirmEmailPage = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const confirmationData = useMemo(() => {
    const email = searchParams.get("email");
    const code = searchParams.get("code");
    const storeId = searchParams.get("storeId") ?? defaultStoreId;
    return { email, code, storeId } as {
      email: string | null;
      code: string | null;
      storeId: string;
    };
  }, [searchParams]);

  useEffect(() => {
    const verifyAndLogin = async () => {
      const { email, code, storeId } = confirmationData;
      if (!email || !code) {
        route.replace("/");
        return;
      }
      try {
        const res = await connectionAPIPost<LoginResponse>(
          "/auth/verify-email",
          { email, code, storeId },
          apiUrl,
        );
        await login(res, true);
      } catch (error) {
        // ignore error and just redirect
      } finally {
        route.replace("/");
      }
    };
    void verifyAndLogin();
  }, [confirmationData, login, route]);

  return null;
};

export default ConfirmEmailPage;
