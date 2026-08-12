"use client"

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { UploadButton } from "@/lib/uploadthing"

function CvUpload() {
    const [cvUrl, setCvUrl] = useState('')
    const router = useRouter()

    const handleSubmit = async() => {
        try {

            const updateUserRes = await fetch('/api/user/update',{
                method:"POST",
                body:JSON.stringify({cvUrl:cvUrl})
            })
            if(updateUserRes.ok){
                console.log(updateUserRes.status)
                router.refresh()
            }

        } catch (error) {
            
        }
    }

    useEffect(() => {
        handleSubmit()
    }, [cvUrl])

    
  return (
    <>
    <UploadButton endpoint="cvUploader" appearance={{
        button: "bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 rounded-lg",
    }}  onClientUploadComplete={(res:any) => {
        setCvUrl(res[0].url)
    }} />
    </>
  )
}

export default CvUpload