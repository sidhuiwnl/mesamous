import prisma from "@/app/prismaclient/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(request:Request) {
    const {name,email,isAcceptingMessage} = await request.json()
    try {
        // Retrieve the authenticated user
        const user = auth();

        // Check if user is authenticated
        if (!user || !user.userId) {
            throw new Error("Unauthorized");
        }

        // Create the user in the database
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                isAcceptingMessage: isAcceptingMessage
            }
        });

        return new Response("User created successfully",{status : 200})
    } catch (error) {
        // Handle errors
        console.error("Error while creating user:", error);

        // Check if the error is related to Prisma
        if (error instanceof Error && error.message.includes("Prisma")) {
          throw new Error("Error while interacting with the database");
        }

        return new Response((error as Error).message, { status: 500 });
    }
}
