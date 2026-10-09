"use client";

import { ReactNode } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
export default function Sessionprovider({
  children,
  mySession,
}: {
  children: ReactNode;
  mySession: Session | null;
}) {
  return (
    <NextAuthSessionProvider session={mySession}>
      {children}
    </NextAuthSessionProvider>
  );
}
