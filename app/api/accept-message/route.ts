import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const authUser = auth();
  
  const { isAcceptingMessage,email } = await request.json();

  if (!authUser.userId) throw new Error("Unauthorized");

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error("User not found");

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isAcceptingMessage: isAcceptingMessage,
      },
    });

    return Response.json(
      {
        acceptingMessage: updatedUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while updating Message:", error);
    if (error instanceof Error && error.message.includes("Prisma")) {
      return new Response("Error while interacting with the database", {
        status: 500,
      });
    }

    return new Response((error as Error).message, { status: 500 });
  }
}
