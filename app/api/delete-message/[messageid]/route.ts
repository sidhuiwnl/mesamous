import { NextRequest } from "next/server";
import prisma from "@/app/prismaclient/db";


export async function DELETE(request:NextRequest,
    {params} : {params : {messageid : string}}
){
    
    const messageId = params.messageid

   try {
    const deleteMessage =  await prisma.message.delete({
        where :{
            id   : Number(messageId)
        }
       })
    
       return Response.json({
        message : "The message deleted",
        deleteMessage
       },{status:200})
   } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
   }
}