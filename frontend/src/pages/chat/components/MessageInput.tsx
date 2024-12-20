import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import { Send } from "lucide-react";

import { useChatStore } from "@/stores/useChatStore";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MessageInput = () => {
  const { user } = useUser();
  const { selectedUser, sendMessage } = useChatStore();

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!selectedUser || !user || !newMessage) return;
    sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
    setNewMessage("");
  };

  return (
    <div className="mt-auto border-t border-zinc-800 p-4">
      <div className="flex gap-2">
        <Input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border-none bg-zinc-800"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
