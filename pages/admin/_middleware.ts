import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { jwt } from '../../utils';


export async function middleware( req: NextRequest | any, ev: NextFetchEvent ) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    let url= req.nextUrl.clone();
    if ( !session ) {
        url.basePath = '/auth/login?p=';
        url.pathname = req.page.name!;

        return NextResponse.redirect(url);
    }

    const validRoles = ['admin','super-user','SEO'];

    if ( !validRoles.includes( session.user.role ) ) {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }


    return NextResponse.next();

}