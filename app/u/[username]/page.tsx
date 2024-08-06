"use client";

import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useCallback, useEffect, useState } from "react";

interface MessageComponentProps {
  username: string;
}

const formSchema = z.object({
  message: z.string().max(250, {
    message: "Exceeded the limit",
  }),
});

function MessageComponent({ username }: MessageComponentProps) {
  const { toast } = useToast();
  const { user } = useUser();
  const [acceptMessage, setAcceptMessage] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fetchMessageStatus = useCallback(async () => {
    try {
      const userEmail = user?.emailAddresses[0].emailAddress;
      if (!userEmail) {
        throw new Error("User email not found");
      }

      const response = await axios.get(
        `/api/get-message-status?userEmail=${encodeURIComponent(userEmail)}`
      );
      setAcceptMessage(response.data.isAcceptingMessage);
    } catch (error) {
      console.error("Error fetching message status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to fetch user's message acceptance status",
      });
    }
  },[toast,user?.emailAddresses]);

  useEffect(() => {
    

    if(user){
        fetchMessageStatus();

        const intervalId = setInterval(fetchMessageStatus, 20000);

       

        return () => clearInterval(intervalId);
    }
  }, [user,fetchMessageStatus]);

  const messageContent = form.watch("message");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Submitting message:", data.message);
    console.log("User email:", user?.emailAddresses[0].emailAddress);

    try {
      const response = await axios.post("/api/send-message", {
        message: data.message,
        email: user?.emailAddresses[0].emailAddress,
      });

      console.log("Response from server:", response.data);

      toast({
        variant: "default",
        title: "Message Sent",
        description: `This message will send to ${username}`,
      });
    } catch (error) {
      console.error("Error sending message:", error);

      toast({
        variant: "destructive",
        title: "Message not sent",
        description: `The message cannot be delivered`,
      });
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      {acceptMessage ? (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" disabled={!messageContent}>
              Send It
            </Button>
          </div>
        </form>
      </Form>
      ) :(
        <p className="text-center text-lg">This user is not currently accepting messages.</p>
      )}
      
    </div>
  );
}

function MessagePage() {
  const params = useParams();

  const username = params.username as string;

  return (
    <div>
      <MessageComponent username={username} />
    </div>
  );
}

export default MessagePage;
