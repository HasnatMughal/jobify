"use client"

import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function ApplyJob(){
const {id} = useParams()
const [userCv, setUserCv] = useState('')
 const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [coverLetter, setCoverLetter] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [userRole, setuserRole] = useState('')


async function getUserCv(){
    try {
        const cvUrl = await fetch(`/api/user/me`,{
            method:"GET"
        })
        const cvData = await cvUrl.json()
        console.log(cvData ? cvData.userCV : "")
        setUserCv(cvData ? cvData.userCV : "")
        setuserRole(cvData ? cvData.userRole : "")
        
    } catch (error) {
        
    }
}

useEffect(() => {
    getUserCv()
},[])
 
const router = useRouter()
console.log(userCv)
console.log(userRole)

if(userRole === "company" || userRole === "") redirect('/login')

   
    

   

    const handleSubmit = async() => {

        try {
            const formData = new FormData()
            
            const applicationRes = await fetch(`/api/jobs/${id}/apply`,
                {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({seekerName:name,seekerPh:phone,seekerMail:email,coverLetter:userCv, jobId:id, })
                }
            )
            if(applicationRes.ok){
                setSubmitted(true)
                setName('')
                setPhone('')
                setEmail('')
                console.log(userCv)
            }

        } catch (error) {
            
        }
    }

    return(
        <>
        {submitted && (
    <div className="text-center p-8 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-green-600">Application Submitted!</h2>
        <p className="text-gray-500">We'll get back to you soon.</p>
        <Link href="/" className="text-blue-600 hover:underline">Explore more jobs →</Link>
    </div>
)}
        <form onSubmit={(e) => { 
            e.preventDefault()
         handleSubmit() }} className="flex flex-col gap-4 max-w-lg mx-auto p-6">
    <input value={name} onChange={(e:any) => setName(e.target.value)} placeholder="Full Name" className="border border-gray-200 p-3 rounded-lg" />
    <input value={phone} onChange={(e:any) => setPhone(e.target.value)} placeholder="Phone Number" className="border border-gray-200 p-3 rounded-lg" />
    <input value={email} onChange={(e:any) => setEmail(e.target.value)} placeholder="Email" className="border border-gray-200 p-3 rounded-lg" />
    
    <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg">Submit Application</button>
</form>
        </>
    )
}