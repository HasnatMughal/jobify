import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

export async function getUser(){
    const jwtSecret:any = process.env.JWT_SECRET
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if(!token) return
    const decoded = jwt.verify(token.value, jwtSecret )

    return decoded as{id:string, name:string, role:string, bio:string, profilePic:string, cvUrl:string}

}