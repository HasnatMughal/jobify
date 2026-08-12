"use client"

import Container from "@/components/Container"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function CareerAdvice(){
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
    if(userRole === "company") redirect('/')
    const [resume, setResume] = useState<File | null>(null)
    const [advice, setAdvice] = useState('')
    // const formData:any = new FormData()
    // formData.append('file', resume)
    const handleSubmit = async () => {
        try {
            const formData:any = new FormData()
    formData.append('file', resume)
            const sendRes = await fetch(`/api/career-advice`,
                {method:"POST",
                body:formData
                }
               
            )
             if(sendRes.ok){
                    console.log("File sent")
                    // console.log(sendRes.json())
                    const data = await sendRes.json()
                    const careerAdvice = await data.advice
                    // console.log(careerAdvice)
                    setAdvice(careerAdvice)
                }
        } catch (error) {
            
        }
    }

    return(
        <div >
            <Container>
                <div className="flex flex-col justify-center ">
                    <h1 className="text-2xl font-semibold">Career Advice</h1>
                    <p className="text-lg">Upload your resume and get the best and personalized career advice from our Ai partner</p>
                </div>
            <form action="" onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }} className="flex items-center  gap-4">
                <input type="file" name="" id="" onChange={(e:any) => setResume(e.target.files[0])} />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl">Submit</button>

            </form>
            <div className="flex flex-col items-start mt-5">
                <h1 className="text-2xl font-semibold">Advice:</h1>
                <div className="prose max-w-none whitespace-pre-wrap leading-relaxed">{advice}</div>
            </div>

            </Container>
        </div>
    )

}