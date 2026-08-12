import connectDb from "@/app/lib/mongodb"
import user from "@/models/user"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"



export async function POST(request:any){
    const {email, password} = await request.json()

    await connectDb()

    const existingUser = await user.findOne({email})
    if(!existingUser){
        return NextResponse.json({error:"User not found"}, {status:402})
    }

    const isMatch = await bcrypt.compare(password, existingUser.password)

    if(!isMatch) return NextResponse.json({message:"Wrong Password"}, {status:401})

    const jwtSecret = process.env.JWT_SECRET as string
    const token = jwt.sign({id:existingUser._id, name:existingUser.name, role:existingUser.role, bio:existingUser.bio, profilePic:existingUser.profilePic, cvUrl:existingUser.cvUrl}, jwtSecret,{expiresIn:"30d"} )
    console.log(token)

    const response = NextResponse.json({message:"Login success"},{status:201})

    response.cookies.set("token", token, {httpOnly:true})

    return response

}