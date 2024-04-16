"use client";

import { User } from "@/types/user";
import { signOut } from "next-auth/react";
import { useEffect } from "react"
import { useSession } from "next-auth/react"
type UserInfoProps = {
  user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
  const { data: session, status, update } = useSession()
  
  const handleLogout = async () => {
    await signOut();
  }

  return(
    <div className="rounded-lg border shadow-lg p-10">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button className="font-medium mt-2 text-blue-600 hover:underline" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}