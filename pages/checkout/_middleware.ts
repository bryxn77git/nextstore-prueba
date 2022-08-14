import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";
 
 
export const middleware= async( req:NextRequest, ev:NextFetchEvent )=>{
 
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if( !session ){
       let url= req.nextUrl.clone();
        url.basePath = '/auth/login?p=';
        url.pathname = req.page.name!;
        return NextResponse.redirect(url)
    }

    return NextResponse.next();
 
    // let url= req.nextUrl.clone();
    // url.basePath = '/auth/login?p=';
    // url.pathname = req.page.name!;
 
    // const {token=''}= req.cookies;
 
    //     try {
        
    //      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
    //      return NextResponse.next();
           
    //     } catch (error) {
    //         return NextResponse.redirect(url);
    //     }
 
 
}
