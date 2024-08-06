import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";


export async function GET(request:NextRequest){
    
    const userAuth = auth();

    if(!userAuth.userId) throw new Error("Unauthorizes Access")
    
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');
    console.log(userEmail)
    if (!userEmail) {
        return Response.json({ error: "Email is required" }, { status: 400 });
      }

   try {
    const user  = await prisma.user.findUnique({
        where : {
            email : userEmail
        }
    })

    

    const userMessage = await prisma.message.findMany({
        where : {
            userId : user?.id
        },
        select :{
            id : true,
            content : true,
            createdAt : true
        }

    }) 

    if(!userMessage){
        return new Response("the user doesn't have messages",{status : 401})
    }
   
    return Response.json({
        userMessage
    },{status:200})
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