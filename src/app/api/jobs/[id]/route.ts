import connectDb from "@/app/lib/mongodb"
import Job from "@/models/Job"
import { NextResponse } from "next/server"

export async function GET(request:any,{params}:any){
    const {id} = await params

    await connectDb()

    const existingJob = await Job.findById(id)
    if(!existingJob) return NextResponse.json({message:"Job not found"})

    return NextResponse.json({message:"Job found", existingJob})
}

export async function PUT(request:any,{params}:any){
    const {id} = await params
    const {title, description, salary, deadline, location} = await request.json()

    await connectDb()

    const updatedJob:any = await Job.findByIdAndUpdate(id,{
        title, description, salary, deadline, location
    },{new:true})

    return NextResponse.json({message:"Job updated successfully",updatedJob})
}

export async function DELETE(request:any,{params}:any){
    const {id} = await params

    await connectDb()

    const deletion = await Job.findByIdAndDelete(id)
    if(!deletion) return NextResponse.json({message:"Job not found"})

    return NextResponse.json({message:"Job deleted successfully"})
}