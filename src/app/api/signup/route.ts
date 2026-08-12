import connectDb from "@/app/lib/mongodb"
import user from "@/models/user"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(request:any){
    const {email, password, name, role, profilePic, bio} = await request.json()

    await connectDb()

    const existingUser = await user.findOne({email})

    if(existingUser){
        return NextResponse.json({error:"User already exists"}, {status:400})
    }

    const hashedPassword = await bcrypt.hash(password, 15)

    const newUser = user.create({name, email, password:hashedPassword, role, profilePic, bio})

    return NextResponse.json({message:"User created successfully"}, {status: 201})
}