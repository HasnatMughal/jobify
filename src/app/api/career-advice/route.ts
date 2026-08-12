import Groq from "groq-sdk"
import { NextResponse } from "next/server"
// const pdfParse = require('pdf-parse')
import {extractText} from 'unpdf'

export async function POST(request:any){
    const data = await request.formData()
    const file = data.get('file')
    const bytes = await file.arrayBuffer()
    const uInt8Array = new Uint8Array(bytes)
    const {text}= await extractText(uInt8Array, {mergePages: true})
    console.log(text)

    // return NextResponse.json({message:text})

    const groq =  new Groq({apiKey: process.env.GROQ_API_KEY})
    const completion = await groq.chat.completions.create({
        model:"llama-3.3-70b-versatile",
        messages:[{
             
        role: 'system',
        content: 'You are a career advisor. Give structured advice with clear headings and numbered lists. Do not use asterisks (*) or markdown bold (**). Use plain text headings followed by colon, and numbers for lists. Add headings in bold and break line after each paragraph, add lists for the list with bullet points. '
    },{
            role:"user",
            content: `Analyze this resume and give detailed career advice , suitable role , and the expected salary ${text}`
        }]
    })
    return NextResponse.json({advice: completion.choices[0].message.content})
    

}