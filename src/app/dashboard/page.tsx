import Job from "@/models/Job"
import { getUser } from "../lib/auth"
import connectDb from "../lib/mongodb"
import PostedJob from "@/components/PostedJob"
import Logout from "@/components/Logout"
import CvUpload from "@/components/CvUpload"
import Link from "next/link"
import user from "@/models/user"
import RemoveCV from "@/components/RemoveCV"
import Application from "@/models/Application"
import AppliedJobs from "@/components/AppliedJobs"


export default async function Dashboard(){
    const userSab = await getUser()
    const userName:any = userSab?.name
    const userBio : any = userSab?.bio
    const userId: any = userSab?.id
    const userRole :any = userSab?.role
    
    // console.log(userCv)
    
    await connectDb()
    
    const dbUser = await user.findById(userId).lean()
    const userCv:any = dbUser?.cvUrl

    
  
       const appliedJobsByMe : any = await Application.find({jobSeekerId:userId}).populate('jobId').lean()

       

      const jobIds = appliedJobsByMe.map((application:any) => {
        const job = application.jobId
        // console.log(job)
        return job
       })

       const myAppliedJobs = await Job.find({_id: {$in :jobIds}}).lean()
    //    console.log(myAppliedJobs)

       const appliedJobsCount: number = myAppliedJobs.length
    //    console.log(appliedJobsByMe)

    const postedJobsByMe: any = await Job.find({postedBy:userId}).lean()
    
    const jobsCount : number = postedJobsByMe.length

    // console.log(postedJobsByMe, jobsCount)
    return(
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-8 w-full">
            <div className="rounded-full w-32 h-32  md:w-48 md:h-48 border flex items-center justify-center bg-gray-100 text-3xl font-bold ">
                {/* <img src="" alt="" className="w-full h-full rounded-full " /> */}
                {userName?.slice(0, 2).toUpperCase()}
            </div>
            <div>
<h1 className="text-3xl font-semibold">Hi, {userName}</h1>
            <p className="text-gray-500 text-sm">{userBio || "No bio added yet"}</p>
            {userRole === "jobSeeker" ? userCv ? <div className="flex flex-col"><a href={userCv} target="_blank download" className="text-blue-600 hover:underline">View CV </a><RemoveCV /></div> : <CvUpload /> : ""
            }
            
            </div>
            </div>
            <div className="flex flex-col justify-end">
                <Logout />
            </div>
            
</div>

<div className="flex justify-center md:justify-start w-full">
    <div className="w-64 mt-10 h-64 rounded-2xl flex flex-col justify-center gap-4 items-center border ">
        <h1 className="text-2xl font-semibold">{userRole === "company" ? "Posted Jobs" : "Applied Jobs" }</h1>
        <p>{userRole === "company" ? jobsCount :  userRole === "jobSeeker" && appliedJobsCount}</p>
    </div>
</div>

{
    userRole === "company" ? 
    <div className="mt-5">
    <h1 className="text-2xl font-semibold">Your Posted Jobs</h1>
    <div className="grid grid-rows-2 gap-2 ">
    {postedJobsByMe ? postedJobsByMe.map((job:any) => {
        return(
            <li key={job._id}>
                <PostedJob id={String(job._id)} title={job.title} salary={job.salary} />
            </li>
        )
    }) : []}
</div>
</div> : userRole === "jobSeeker" ? <div className="mt-5">
    <h1 className="text-2xl font-semibold">Your Applied Jobs</h1>
    <div className="grid grid-rows-2 gap-2 ">
    {myAppliedJobs ? myAppliedJobs.map((job:any) => {
        const status = appliedJobsByMe.find((app:any) => app.jobId.toString() === job._id.toString())?.status
        // console.log(appliedJobsByMe)
        // console.log(status)
        return(
            <li key={job._id}>
                <AppliedJobs id={String(job._id)} title={job.title} salary={job.salary} company={job.company} status={status} />
            </li>
        )
    }) : []}
</div>
</div> : ""
}

        </div>
    )
}