"use client"

import { redirect, useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Container from "@/components/Container"
import Application from "@/components/Application"

export default function Applications(){
    const [userRole, setUserRole] = useState('')
    
        const getUserData = async() => {
            try {
                 const userRes = await fetch(`/api/user/me`,{
                method:"GET"
            })
            const userData = await userRes.json()
            console.log(userData ? userData.userCV : "")
           
            setUserRole(userData ? userData.userRole : "")
            
        
            } catch (error) {
                
            }
        }
         useEffect(() => {
            getUserData()
        },[])
    if(userRole === "jobSeeker") redirect('/')
    const {id} = useParams()
    const [job,setJob] = useState<any>({})
    const [applications, setApplications] = useState([])
    const router = useRouter()

    const handleApplicaion = async (id:any, status:any) => {
        try {
            const applicationRes = await fetch(`/api/applications/${id}`,
                {
                method:"PATCH",
            body:JSON.stringify({status})})
            if(applicationRes.ok){
                router.refresh()
            }
        } catch (error) {
            
        }
    }
    const getCurrentjob = async () => {
        try {
            const jobRes = await fetch(`/api/jobs/${id}`,{
                method:"GET"
            })
            if(jobRes.ok){
                const jobData = await jobRes.json()
                setJob(jobData.existingJob)
                console.log(jobData.existingJob)
            }
        } catch (error) {
            
        }
    }
    const getAllApplications = async () => {
        const applicationsRes = await fetch(`/api/jobs/${id}/applications`,{
        method:"GET"
    })
    if(applicationsRes.ok){
        const applications = await applicationsRes.json()
        console.log(applications.userApplications)
        setApplications(applications.userApplications)
    }
    }
    useEffect(() => {
        getAllApplications()
        getCurrentjob()
    }, []) 

    return(
        <div className="min-h-screen">
            <Container>
                <div className="flex flex-col gap-8">
                    <h1 className="text-3xl text-center font-semibold">Job Details</h1>
                    <div className="flex flex-col items-start gap-2">
                        <h1 className="text-xl font-semibold">Title : {job?.title}</h1>
                        <h2 className="text-gray-700 text-sm">Posted by {job?.company}</h2>
                        <div>
                            <h2 className="text-lg font-semibold">Description:</h2>
                        <p className="text-sm">{job?.description}</p>
                        </div>
                        
                    </div>
                    <div>
                    <h1 className="text-3xl text-center font-semibold ">Applications</h1>
                        <div className="grid mt-5 grid-cols-2 gap-4">
                            {applications ? applications.map((app:any) => {
                                return(
                                    <li key={String(app._id)}>
                                        <Application 
                                        status={app.status}
                                        seekerMail={app.seekerMail}
                                         seekerName={app.seekerName} seekerPh={app.seekerPh}
                                         CV={app.coverLetter} onAcceptFn={() => handleApplicaion(app._id, "Accepted")} 
                                         onRejectFn={() => handleApplicaion(app._id, "Rejected")} />
                                    </li>
                                )
                            }): []}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}