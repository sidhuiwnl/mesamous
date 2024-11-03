import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { getMessages } from "@/server/queries";
import { MessageCardProps, Message, MessagesResponse } from "@/lib/types";
import { toast } from "sonner";

const MessageCard = forwardRef<
  { fetchMessages: () => Promise<void> },
  MessageCardProps
>(({ userId, setSpin }, ref) => {
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);

  const fetchMessages = async () => {
    try {
      setSpin(true);
      const response: MessagesResponse = await getMessages({ userId });
      if (typeof response !== "string" && response.success) {
        setMessages(response.messages);
      } else {
        toast("Failed to retrieve messages");
      }
    } catch (error) {
      toast("An error occurred while fetching messages");
      console.error(error)
    } finally {
      setSpin(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchMessages,
  }));

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  return (
    <div className="mt-5 space-y-3 grid grid-cols-4">
      {messages?.map((msg) => (
        <div key={msg.id} className="message-card space-y-2 space-x-1">
          {msg.image && (
            <div
              dangerouslySetInnerHTML={{ __html: msg.image }}
              className="svg-container w-10 h-10"
            />
          )}
          <p>Name : {msg.seed}</p>
          <p>Message : {msg.message}</p>
        </div>
      ))}
    </div>
  );
});

export default MessageCard;
