"use client"

import JobCard from "@/components/JobCard";
import SearchForm from "@/components/SearchForm";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"


export default function Home() {

  const searchParams = useSearchParams()
      const title =   searchParams.get('title')
      const location =  searchParams.get('location')
  
      console.log(title, location)
  const [jobs,setJobs] = useState([])
  const [userRole, setUserRole] = useState('')
  console.log(userRole)

useEffect(() => {
    fetch('/api/user/me')
        .then(res => res.json())
        .then(data => setUserRole(data.userRole))
        // console.log(userRole)
}, [])


  const getAllJobs = async () => {
    try {
      const jobsRes = await fetch('/api/jobs/all',{
        method:"GET",
      })
      const jobsData:any  = await jobsRes.json()
      setJobs(jobsData.jobs)
      console.log(jobsData.jobs);
      
    } catch (error) {
      
    }
  }
const getJobs = async () => {
    try {
      const jobsRes = await fetch(`/api/jobs?title=${title}&location=${location}`,{
        method:"GET",
      })
      const jobsData:any  = await jobsRes.json()
      setJobs(jobsData.jobs)
    } catch (error) {
      
    }
  }
  useEffect(() => {
    if(title && location){
      getJobs()
    } else{
      getAllJobs()
    }
    
  }, [title, location])
  return (
    <div className="flex min-h-screen flex-col mt-10 ">
      <section className="flex max-h-[80vh] h-full  gap-4 flex-col">
        <div className="flex flex-col items-center gap-4 mb-5 justify-center">
        <h1 className=" text-2xl md:text-5xl font-bold text-center">Your dream job, one search away</h1>
        <h2 className="text-sm text-center">Search for your desired roles all over the globe and land your dream job today.</h2>

        </div>
        <SearchForm />
      </section>
      <section className="flex min-h-screen h-full mt-10  gap-4 flex-col">
          <h1 className="text-3xl font-semibold">Jobs for you</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {jobs? jobs.map((job:any) => {
            return(
              <li key={job._id}>
                <JobCard id={String(job._id)} jobTitle={job.title} jobDescription={job.description} salary={job.salary} companyName={job.company} userRole={userRole} location={job.location} />
              </li>
            )
          }): []}
          </div>
      </section >
    </div>
  );
}
