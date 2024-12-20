import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import { Loader } from "lucide-react";

import { axiosInstance } from "@/lib/axios";

import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

const updateApiToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);

        if (token) {
          await checkAdminStatus();

          // init socket
          if (userId) initSocket(userId);
        }
      } catch (error) {
        updateApiToken(null);
        console.log("Error in AuthProvider", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // clean up
    return () => disconnectSocket();
  }, [getToken, checkAdminStatus, initSocket, userId, disconnectSocket]);

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="size-8 animate-spin text-emerald-500" />
      </div>
    );

  return <div>{children}</div>;
};

export default AuthProvider;
