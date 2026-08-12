import connectDb from "@/app/lib/mongodb"
import Job from "@/models/Job"
import { NextResponse } from "next/server"


export async function GET(request:any){
    const {searchParams} = new URL(request.url)
    const location = searchParams.get('location')
    const title = searchParams.get('title')

    await connectDb()

    const query :any = {}
     if(title) query.title = { $regex: title, $options: 'i' }
    if(location) query.location = { $regex: location, $options: 'i' }
    const jobs = await Job.find(query).lean()
    return NextResponse.json({jobs})
}