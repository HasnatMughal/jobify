import { getUser } from "@/app/lib/auth"
import connectDb from "@/app/lib/mongodb"
import user from "@/models/user"
import { NextResponse } from "next/server"


export async function POST(request:any){
    const userSab = await getUser()
    const userId = userSab?.id
    console.log("userId",userId)
    const {cvUrl, bio, profilePic} = await request.json()

    await connectDb()

    const updatedUser = await user.findByIdAndUpdate(userId,{cvUrl, bio, profilePic}).lean()
    if(!updatedUser) return NextResponse.json({message:"User not found"})

    return NextResponse.json({message:"User updated", updatedUser:updatedUser})

}