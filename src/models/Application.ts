import mongoose from "mongoose"

interface application{
    jobId:string,
    jobSeekerId:string,
    status:string
    createdAt:Date,
    coverLetter: string,
    seekerName:string,
    seekerPh:number,
    seekerMail:string
}


const ApplicationSchema = new mongoose.Schema<application>({
    jobId:String,
    jobSeekerId:String,
    status:{type:String, default:"pending"},
    createdAt:{type:Date, default:Date.now},
    coverLetter:String,
    seekerName:String,
    seekerPh:Number,
    seekerMail:String
})

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema)