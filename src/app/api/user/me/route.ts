import connectDb from "@/app/lib/mongodb";
import { getUser } from "@/app/lib/auth";
import user from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(){
     const userSab = await getUser()
        const userId: any = userSab?.id
        const userRole:any = userSab?.role
        
        await connectDb()
        
        const userData = await user.findById(userId).lean()
        const userCv:any = userData?.cvUrl
        

        return NextResponse.json({userCV:userCv, userId:userId, userRole:userRole})

}