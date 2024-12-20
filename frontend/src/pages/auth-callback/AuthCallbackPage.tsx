import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { axiosInstance } from "@/lib/axios";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const syncAttempted = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempted.current) return;

      try {
        syncAttempted.current = true;

        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log("Error in AuthCallbackPage", error);
      } finally {
        navigate("/");
      }
    };

    syncUser();
  }, [isLoaded, navigate, user]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Card className="w-[90%] max-w-md border-zinc-800 bg-zinc-900">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 animate-spin text-emerald-500" />

          <h3 className="text-xl font-bold text-zinc-400">Logging you in</h3>

          <p className="text-sm text-zinc-400">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
