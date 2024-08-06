import prisma from "@/app/prismaclient/db";

export async function POST(request: Request) {
  const { message, email }: { message: string; email: string } =
    await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return new Response("User not signedIn", { status: 404 });
    }

    // Create a new message for the recipient
    const newMessage = await prisma.message.create({
      data: {
        content: message,
        userId: user.id,
        createdAt: new Date(),
      },
    });

    return new Response(JSON.stringify(newMessage), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error while creating message:", error);

    if (error instanceof Error && error.message.includes("Prisma")) {
      return new Response("Error while interacting with the database", {
        status: 500,
      });
    }

    return new Response((error as Error).message, { status: 500 });
  }
}
