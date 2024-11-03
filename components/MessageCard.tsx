import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { getMessages } from "@/server/queries";
import { MessageCardProps,Message,MessagesResponse } from "@/lib/types";


const MessageCard = forwardRef<
  { fetchMessages: () => Promise<void> },
  MessageCardProps
>(({ userId, setSpin }, ref) => {
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      setSpin(true);
      const response: MessagesResponse = await getMessages({ userId });
      if (typeof response !== "string" && response.success) {
        setMessages(response.messages);
      } else {
        setError("Failed to retrieve messages");
      }
    } catch (error) {
      setError("An error occurred while fetching messages");
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

  if (error) {
    return <div>{error}</div>;
  }

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
