"use client"
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobPost(){
  
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

      const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [salary, setSalary] = useState('')
    const [location, setLocation] = useState('')
    const [deadline, setDeadline] = useState('')
    const router = useRouter()

    const handleSubmit = async () => {
        try {
            const jobRes = await fetch('/api/jobs',
                {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body:JSON.stringify({title, description, salary, location, deadline })
                }
            )
            if(jobRes.ok){
                router.push('/')
            }
        } catch (error) {
            
        }
    }

   
    return(
        <div>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="flex flex-col gap-4 max-w-lg mx-auto p-6">
            <input value={title} onChange={(e:any) => setTitle(e.target.value)} placeholder="Job Title" className="border border-gray-200 p-3 rounded-lg" />
            <textarea value={description} onChange={(e:any) => setDescription(e.target.value)} placeholder="Job Description" className="border border-gray-200 p-3 rounded-lg min-h-32"></textarea>
            <input value={salary} onChange={(e:any) => setSalary(e.target.value)} placeholder="Salary" className="border border-gray-200 p-3 rounded-lg" />
            <input value={location} onChange={(e:any) => setLocation(e.target.value)} placeholder="Location" className="border border-gray-200 p-3 rounded-lg" />
            <input type="date" value={deadline} onChange={(e:any) => setDeadline(e.target.value)} className="border border-gray-200 p-3 rounded-lg" />
            <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg">Post Job</button>
        </form>
        </div>
    )
}