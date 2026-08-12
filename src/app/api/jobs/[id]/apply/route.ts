import { getUser } from "@/app/lib/auth"
import connectDb from "@/app/lib/mongodb"
import Application from "@/models/Application"
import { NextResponse } from "next/server"

export async function POST(request:any){
    const user = await getUser()
    const userId = user?.id
    const {seekerName, seekerPh, seekerMail, jobSeekerId, jobId, coverLetter } = await request.json()

    await connectDb()

    const application:any = await Application.create({seekerName, seekerPh, seekerMail, jobSeekerId:userId, jobId, coverLetter})
    return NextResponse.json({message:"Job applied successfully", jobApplication: application})
}