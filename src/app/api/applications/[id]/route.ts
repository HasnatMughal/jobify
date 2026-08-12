import connectDb from "@/app/lib/mongodb"
import Application from "@/models/Application"
import { NextResponse } from "next/server"

export async function PATCH(request:any,{params}:any){
    const {id} = await params
    const {status} = await request.json()

    await connectDb()

    const updatedStatus = await Application.findByIdAndUpdate(id,{status:status}, {new:true}).lean()

    return NextResponse.json({message:"Status updated", updated:updatedStatus})
}