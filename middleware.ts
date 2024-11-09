import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Session } from "better-auth";
import { betterFetch } from "@better-fetch/fetch";


export default async function authMiddleware(request : NextRequest){
    const { data  : session }  = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL : request.nextUrl.origin,
            headers : {
                cookie: request.headers.get("cookie") || "",
            }
        }
    )

    if(!session){
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

function corsMiddleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}


export async function middleware(request : NextRequest){
    if (request.nextUrl.pathname.startsWith("/api/")) {
        return corsMiddleware(request);
    }

    return authMiddleware(request);
}

export const config = {
    matcher : ["/api/:path*","/","/send"]
}