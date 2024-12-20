import { Link } from "react-router-dom";
import { SignedOut, UserButton } from "@clerk/clerk-react";

import { LayoutDashboardIcon } from "lucide-react";

import SignInOAuthButtons from "@/components/SignInOAuthButtons";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useAuthStore } from "@/stores/useAuthStore";

const Topbar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-zinc-900/75 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <img src="/spotify.png" className="size-8" alt="Spotify logo" />
        {import.meta.env.VITE_APP_NAME}
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4" />
            Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
