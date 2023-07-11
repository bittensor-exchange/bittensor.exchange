/* eslint-disable @next/next/no-page-custom-font */
"use client";

import ValidateUser from "@/components/auth/validate";
import { IRoot } from "@/data/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { replace } = useRouter();
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      // replace("/dashboard");
    } else {
      replace("/login");
    }
  }, []);
  const login = useSelector((state: IRoot) => state.user.login);
  return (
    <ValidateUser>
      {Boolean(login) && Boolean(localStorage.getItem("auth")) ? (
        <>
        {children}
        </>
      ) : (
        <Loading/>
      )}
    </ValidateUser>
  );
}
