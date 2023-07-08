"use client";

import { fetchUser } from "@/data/container/user";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ValidateUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { replace } = useRouter();

  useEffect(() => {
    const validateUser = async () => {
      const user = await dispatch(fetchUser());
      if (!user.payload) replace("/login");
      if (user.type === "users/fetchUser/fulfilled") {
      } else {
        replace("/login");
      }
    };
    validateUser();
  }, []);

  return <>{children}</>;
}
