import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import { useChatStore } from "@/stores/useChatStore";
import { formatChatTime } from "@/utils/formatTime";

import Topbar from "@/components/Topbar";
import UsersList from "@/pages/chat/components/UsersList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import MessageInput from "./components/MessageInput";

const ChatPage = () => {
  const { user } = useUser();
  const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  return (
    <main className="h-full overflow-hidden rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />

      <div className="grid h-[calc(100vh-180px)] grid-cols-[80px_1fr] lg:grid-cols-[300px_1fr]">
        <UsersList />

        {/* chat message */}
        <div className="flex h-full flex-col">
          {selectedUser ? (
            <>
              <ChatHeader />

              {/* Messages */}
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="space-y-4 p-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex items-start gap-3 ${
                        message.senderId === user?.id ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="size-8">
                        <AvatarImage
                          src={
                            message.senderId === user?.id
                              ? user.imageUrl
                              : selectedUser.imageUrl
                          }
                        />
                      </Avatar>

                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${message.senderId === user?.id ? "bg-green-500" : "bg-zinc-800"} `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="mt-1 block text-xs text-zinc-300">
                          {formatChatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  );
};
export default ChatPage;

const NoConversationPlaceholder = () => (
  <div className="flex h-full flex-col items-center justify-center space-y-6">
    <img src="/spotify.png" alt="Spotify" className="size-16 animate-bounce" />
    <div className="text-center">
      <h3 className="mb-1 text-lg font-medium text-zinc-300">
        No conversation selected
      </h3>
      <p className="text-sm text-zinc-500">Choose a friend to start chatting</p>
    </div>
  </div>
);
