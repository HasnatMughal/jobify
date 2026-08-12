"use client"

import { useState , useEffect} from "react"
import React  from 'react'

type data={
    id :string,
    title:string,
    salary:string,
    company:string,
    status : string
}

function AppliedJobs({id, title, salary, company, status}:data) {
 
  return (
   <div className='w-full flex items-center border rounded-2xl justify-between p-4'>
        <div className="flex flex-col justify-center items-start">
        <h2 className="text-xl font-semibold">
            {title}
        </h2>
        <p className="text-sm">
            {salary}
        </p>
        <p className="text-sm">
            Posted by{company}
        </p>
        </div>
        <div className="flex flex-col items-center">
            <h2>Status</h2>
            {status === "pending" ? <p className="text-yellow-500">Pending</p> : status === "Rejected" ? <p className="text-red-500">Rejected</p> : status === "Accepted" && <p className="text-green-500">Accepted</p>}
        </div>
    </div>
  )
}

export default AppliedJobs