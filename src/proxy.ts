import { NextResponse } from "next/server"

export  function proxy(request:any){
    const token = request.cookies.get('token')

    if(!token) {return NextResponse.redirect(new URL('/login',request.url))}

    return NextResponse.next()
}
export const config = {
    matcher: ['/dashboard/:path*', '/jobs/new', '/jobs/:path*/apply', '/jobs/:path*/edit']
}