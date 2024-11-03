"use client";

import { useForm } from "react-hook-form";
import { addMessage } from "@/server/queries";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "sonner";

export default function User() {
  const session = useSession();

  const user = session.data?.user;

  const { watch, register, handleSubmit, reset } = useForm();

  const message = watch("message");

  const onSubmit = async () => {
    try {
      const response = await addMessage({ message, user });
      reset();
      toast(response);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold antialiased tracking-tighter">
        Type Your Anonmyous Message.
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 items-center"
      >
        <textarea
          required
          className="w-[900px] h-[200px] mt-10 rounded-xl text-black placeholder:text-black bg-neutral-300 p-4 text-top resize-none"
          placeholder="Hloo user! How are you?..."
          {...register("message", { required: true })}
        />
        <button className="bg-white text-black w-[100px] h-10 rounded-lg font-medium ">
          Send
        </button>
      </form>
    </div>
  );
}
