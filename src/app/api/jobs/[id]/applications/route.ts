import connectDb from "@/app/lib/mongodb";
import Application from "@/models/Application";
import { getUser } from "@/app/lib/auth";
import { NextResponse } from "next/server";


export async function GET(request:any, {params}:any){
    const {id} = await params
        

    await connectDb()
    // const query = userId
    const applications = await Application.find({jobId:id}).lean()

    return NextResponse.json({message: "Your applications are found",userApplications: applications})
}