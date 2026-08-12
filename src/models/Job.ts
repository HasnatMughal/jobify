import mongoose from "mongoose"

interface Job{
    title:string,
    description:string,
    salary:string,
    company:string,
    location:string,
    deadline:string,
    createdAt:Date,
    postedBy: string
}

const JobSchema = new mongoose.Schema<Job>({
     title:String,
    description:String,
    salary:String,
    company:String,
    location:String,
    deadline:String,
    createdAt:{type:Date, default:Date.now},
    postedBy: String

})

export default mongoose.models.Job || mongoose.model("Job", JobSchema)