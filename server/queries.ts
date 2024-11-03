"use server";

import { prisma } from "@/app/lib/prisma";

import { generateId } from "@/app/lib/generateid";
import { UserTypes } from "@/app/lib/types";
import createAva from "@/app/lib/createAvatar";


export async function addMessage({
  message,
  user,
}: {
  message: string;
  user: UserTypes;
}) {
  const { svg, randomSeed } = createAva();

  if (!user) {
    throw new Error("Unauthorized");
  }
  try {
    await prisma.messages.create({
      data: {
        id: generateId(),
        userId: user.id,
        message: message,
        image: svg,
        seed: randomSeed,
      },
    });
    
    return "Message added Successfully";
  } catch (error) {
    console.log(error);
    return "Message cannot be added"
  }
  
}

export async function getMessages({ userId } : { userId : string }) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const messages = await prisma.messages.findMany({
      where: {
        userId: userId,
      },
      select: {
        id : true,
        message: true,
        seed: true,
        image: true,
      },
    });
    return {
      messages : messages,
      success : "Message retrived successfully"
    }
  } catch (error) {
    console.log(error);
    return "Failed to retrieve messages"
  }
}
