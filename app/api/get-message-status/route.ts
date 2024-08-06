import prisma from "@/app/prismaclient/db";
import { NextRequest,NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const userEmail  = request.nextUrl.searchParams.get('userEmail');

  if(!userEmail){
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  try {
    const messageStatus = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        isAcceptingMessage: true,
      },
    });

    if (!messageStatus) {
      return NextResponse.json(
        {
          msg: "User not authenticated properly or Email is invalid",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessage : messageStatus.isAcceptingMessage
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while creating message:", error);

    if (error instanceof Error && error.message.includes("Prisma")) {
      return new Response("Error while interacting with the database", {
        status: 500,
      });
    }
  }
}
