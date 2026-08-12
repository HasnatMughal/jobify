import cloudinary from "@/app/lib/cloudinary"
import { NextResponse } from "next/server"
import { arrayBuffer } from "stream/consumers"

export async function POST(request:any){
    const data = await request.formData()
    const file = data.get('file')
    const bytes = await file.arrayBuffer()
    const  buffer = Buffer.from(bytes)

    const result :any  = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({resource_type:"auto", access_mode: 'public'},(error, result) => {
            
            if(error) reject(error)
            resolve(result)
        const resultUrl = result?.secure_url
        }).end(buffer)
    })

    return NextResponse.json({message:"File uploaded successfully", url:result.secure_url})
}