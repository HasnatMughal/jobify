import connectDb from "@/app/lib/mongodb";
import Application from "@/models/Application";
import { getUser } from "@/app/lib/auth";
import { NextResponse } from "next/server";


export async function GET(){
    const userSab = await getUser()
    const userId: any = userSab?.id
        

    await connectDb()
    // const query = userId
    const applications = await Application.find({jobSeekerId: userId}).lean()

    return NextResponse.json({message: "Your applied jobs are found",userApplications: applications})
}