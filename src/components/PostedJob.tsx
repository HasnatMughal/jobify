"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

type data ={
    id:string,
    title:string,
    salary:number
}

function PostedJob({id,title, salary}:data) {
    const router = useRouter()
    const navigateToEdit = () => {
        router.push(`/jobs/${id}/edit`)
    }
    const navigateToApplications = () => {
        router.push(`/jobs/${id}/applications`)
    }
  return (
    <div className='w-full flex items-center border rounded-2xl justify-between p-4'>
        <div className="flex flex-col justify-center items-start">
        <h2 className="text-xl font-semibold">
            {title}
        </h2>
        <p>
            {salary}
        </p>
        </div>
        <div className='flex items-center gap-4 justify-end'>
            <button className="bg-yellow-500 hover:bg-yellow-700 px-4 py-2 text-white" onClick={() => navigateToEdit()}>Edit Job</button>
            <button className="bg-green-500 hover:bg-green-700 px-4 py-2 text-white" onClick={() => navigateToApplications()}>View Applications</button>
        </div>
    </div>
  )
}

export default PostedJob