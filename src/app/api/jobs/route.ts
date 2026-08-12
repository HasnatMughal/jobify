import connectDb from "@/app/lib/mongodb"
import Job from "@/models/Job"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export async function POST(request:any){
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    const jwtSecret = process.env.JWT_SECRET as string
    const decoded = token ? jwt.verify(token.value, jwtSecret ) as unknown as {id:string, name:string, role:string} : null
    const {title, description, salary,company,location,deadline,postedBy} = await request.json()

    await connectDb()

    const job = await Job.create({title, description, salary,company: decoded?.name,location,deadline,postedBy:decoded?.id})

    return NextResponse.json({message:"Job posted",id:job._id})

}

export async function GET(request:any){
    const {searchParams} = new URL(request.url)
    const location = searchParams.get('location')
    const title = searchParams.get('title')

    await connectDb()
    if(!title && !location) return NextResponse.json({jobs: []}) 

    const query :any = {}
     if(title) query.title = { $regex: title, $options: 'i' }
    if(location) query.location = { $regex: location, $options: 'i' }
    const jobs = await Job.find(query).lean()
    console.log(jobs)
    return NextResponse.json({jobs})
}