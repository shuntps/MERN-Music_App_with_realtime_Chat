import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import { HeadphonesIcon, Music, Users } from "lucide-react";

import { useChatStore } from "@/stores/useChatStore";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FriendsActivity = () => {
  const { user } = useUser();
  const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  return (
    <div className="flex h-full flex-col rounded-lg bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-800 p-4">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0" />

          <h2 className="font-semibold">What they're listening to</h2>
        </div>
      </div>

      {!user && <LoginPrompt />}

      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {users.map((user) => {
            const activity = userActivities.get(user.clerkId);
            const isPlaying = activity && activity !== "Idle";

            return (
              <div
                key={user._id}
                className="group cursor-pointer rounded-md p-3 transition-colors hover:bg-zinc-800/50"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="size-10 border border-zinc-800">
                      <AvatarImage src={user.imageUrl} alt={user.fullName} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>

                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 ${onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"}`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        {user.fullName}
                      </span>

                      {isPlaying && (
                        <Music className="size-3.5 shrink-0 text-stone-400" />
                      )}
                    </div>

                    {isPlaying ? (
                      <div className="mt-1">
                        <div className="mt-1 truncate text-sm font-medium text-white">
                          {activity.replace("Playing ", "").split(" by")[0]}
                        </div>

                        <div className="truncate text-xs text-zinc-400">
                          {activity.split(" by ")[1]}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1 text-xs text-zinc-400">Idle</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendsActivity;

const LoginPrompt = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 p-6 text-center">
      <div className="relative">
        <div
          className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 opacity-75 blur-lg"
          aria-hidden="true"
        />

        <div className="relative rounded-full bg-zinc-900 p-4">
          <HeadphonesIcon className="size-8 text-emerald-400" />
        </div>
      </div>

      <div className="max-w-[250px] space-y-2">
        <h3 className="text-lg font-semibold text-white">
          See what friends are playing
        </h3>

        <p className="text-sm text-zinc-400">
          Login to discover what music your friends are enjoying right now
        </p>
      </div>
    </div>
  );
};
