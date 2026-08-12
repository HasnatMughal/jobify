import React, {useState} from 'react'
import { BiDownArrow } from 'react-icons/bi'
import { BiUpArrow } from 'react-icons/bi'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from 'next/navigation'

type jobData = {
    jobTitle:string,
    location:string,
    companyName:string,
    jobDescription:string,
    salary:number,
    id:any,
    userRole:any
    
}
function JobCard({jobTitle, location, companyName, jobDescription, salary, id, userRole}:jobData) {
    const [viewMore, setViewMore] = useState(false)
    const router = useRouter()
  return (
    <Card className='rounded-2xl p-4' >
        <CardHeader>
        <CardTitle className='text-2xl font-semibold'>{jobTitle}</CardTitle>
        <p className="text-gray-600">Posted by <Link className="hover:text-gray-900" href={"/profile"}>{companyName ? companyName : ""}</Link> </p>
        </CardHeader>
        <CardContent>
        <p><span className='font-semibold'>Salary</span> <br></br>{salary}</p>
     <button className='flex justify-end  w-full hover:text-gray-600' onClick={() => setViewMore(!viewMore)}>
    {viewMore ?
        "View less"
    :
        "View More"}
</button>
        {viewMore === true ? <div className='flex flex-col items-start'>
            <div>
                <h2 className='font-semibold'>Description</h2>
                <p>{jobDescription}</p>
            </div>
            <div>
                <h2 className='font-semibold'>Location</h2>
                <p>{location}</p>
            </div>
        </div> : ""}
        </CardContent>
        {userRole !== "company" && <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 ' onClick={() => router.push(`/jobs/${id}/apply`)}>Apply now</button> }
        
    </Card>
  )
}

export default JobCard