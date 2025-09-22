import React from "react";
import { getServerSession, NextAuthOptions } from "next-auth";
import SessionWrapper from "./sessionWapper";
import { authOptions } from "@/app/conf/auth";
import { ToastContainer } from "react-toastify";
import AdminShell from "./AdminShell";
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions as NextAuthOptions);
  return (
    <SessionWrapper session={session}>
      <ToastContainer />
      <AdminShell>{children}</AdminShell>
    </SessionWrapper>
  );
}
