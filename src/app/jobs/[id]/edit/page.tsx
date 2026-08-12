"use client"

import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DeleteConfirm from "@/components/DeleteConfirm"

export default function JobUpdate(){
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
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [salary, setSalary] = useState('')
    const [location, setLocation] = useState('')
    const [deadline, setDeadline] = useState('')

    const getjob = async () => {
        try {
            const existingjobRes = await fetch(`/api/jobs/${id}`,{
                method:"GET"
            })
            const existingJobData = await existingjobRes.json()
            console.log(existingJobData.existingJob.title)
            if(existingJobData){
                setTitle(existingJobData.existingJob.title)
                setDescription(existingJobData.existingJob.description)
                setSalary(existingJobData.existingJob.salary)
                setDeadline(existingJobData.existingJob.deadline)
                setLocation(existingJobData.existingJob.location)

            }

        } catch (error) {
            
        }
    }

    useEffect(() => {
        getjob()
    },[id])

    

    const handleSubmit = async () => {
        try {
            const updateJobRes = await fetch(`/api/jobs/${id}`,{
                method:"PUT",
                body:JSON.stringify({title, description, salary, deadline, location})
            })
            const updatedData = await updateJobRes.json()
            if(updateJobRes.ok){
                router.push('/')
            }
        } catch (error) {
            
        }
    }

    const deleteJob = async(id:any) => {
        try {
            const delRes = await fetch(`/api/jobs/${id}`,{
                method:"DELETE"
            })
            if(delRes.ok){
                router.push('/')
            }
        } catch (error) {
            
        }
    }

    return(
        <div>
        <form onSubmit={(e) => {
             e.preventDefault()
             handleSubmit() }} className="flex flex-col gap-4 max-w-lg mx-auto p-6">
            <input value={title} onChange={(e:any) => setTitle(e.target.value)} placeholder="Job Title" className="border border-gray-200 p-3 rounded-lg" />
            <textarea value={description} onChange={(e:any) => setDescription(e.target.value)} placeholder="Job Description" className="border border-gray-200 p-3 rounded-lg min-h-32"></textarea>
            <input value={salary} onChange={(e:any) => setSalary(e.target.value)} placeholder="Salary" className="border border-gray-200 p-3 rounded-lg" />
            <input value={location} onChange={(e:any) => setLocation(e.target.value)} placeholder="Location" className="border border-gray-200 p-3 rounded-lg" />
            <input type="date" value={deadline} onChange={(e:any) => setDeadline(e.target.value)} className="border border-gray-200 p-3 rounded-lg" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg">Update Job</button>
        </form>
        <div className="flex flex-col gap-4 max-w-lg mx-auto p-6">

            <DeleteConfirm onConfirm={() => deleteJob(id)} />
        </div>

        </div>
    )


}