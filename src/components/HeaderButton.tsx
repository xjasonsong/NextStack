"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/site";
import { useDictionary } from "@/components/DirectoryProvider";

export default function HeaderButton() {
  const { data: session } = useSession();
  const dictionary = useDictionary();

  return (
    <div>
      {session?.user?.image ? (
        <Link href={ROUTES.dashboard.href}>
          <Avatar className="h-8 w-8 shadow-sm">
            <AvatarImage
              src={session.user.image}
              alt={session.user.name ?? ""}
            />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <Link href={ROUTES.signIn.href}>
          <Button
            variant="default"
            className="bg-gradient-to-r from-primary to-primary/70 text-white"
          >
            {dictionary.common["Sign In"]}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </Button>
        </Link>
      )}
    </div>
  );
}
