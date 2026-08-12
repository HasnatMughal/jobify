"use client"
import React from 'react'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import { HiX } from 'react-icons/hi'

type Navbar ={
    isLoggedIn: boolean,
    isCompany: boolean,
}

function Navbar({isLoggedIn, isCompany}: Navbar) {
    const [viewMenu, setViewMenu] = useState(false)

  return (
    <>
    
    <div className='flex items-center  gap-16 w-full px-8 py-8'>
        <div className='text-3xl w-1/3 flex-1 font-bold capitalize '>Jobify</div>
        {viewMenu === false ? <GiHamburgerMenu className='block relative md:hidden text-xl' onClick={()=> setViewMenu(!viewMenu)}/> : <HiX className='block relative md:hidden text-xl' onClick={()=> setViewMenu(!viewMenu)}/>}
        <div className='md:flex justify-between hidden   w-2/3'>
            <ul className='flex gap-8  '>
            <li><Link className='hover:border-b' href={"/"}>Home</Link></li>
            <li><Link className='hover:border-b' href={isLoggedIn ? "/dashboard" : "/login"}>{isLoggedIn ? "Dashboard" : "Login"}</Link></li>
            
            {!isLoggedIn ?<div className='flex gap-4 justify-between items-center w-full'>
                <li><Link className='hover:border-b' href={"/signup/jobSeeker" }>Register as a Job Seeker </Link></li>
            </div> : ""}
        </ul>
        <ul className='flex gap-4 flex-1 justify-end'>
            {isCompany && isLoggedIn ? <li><Link className='hover:border-b' href="/jobs/new">Post a Job</Link></li> : !isCompany && isLoggedIn ? <li><Link className='hover:border-b' href={"/career-advice"}>Career Advice</Link></li>: <li><Link className='hover:border-b' href="/signup/company">Register as Company</Link></li>}

        </ul>
        </div>
        {
           viewMenu && (
    <div className='absolute top-16 right-4 bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 z-50 min-w-48 border border-gray-100'>
        <Link href="/" className='hover:text-blue-600'>Home</Link>
        <Link href={isLoggedIn ? "/dashboard" : "/login"} className='hover:text-blue-600'>
            {isLoggedIn ? "Dashboard" : "Login"}
        </Link>
        {!isLoggedIn && (
            <Link href="/signup/jobSeeker" className='hover:text-blue-600'>Register as Job Seeker</Link>
        )}
        {isCompany && isLoggedIn && <Link href="/jobs/new" className='hover:text-blue-600'>Post a Job</Link>}
        {!isCompany && isLoggedIn && <Link href="/career-advice" className='hover:text-blue-600'>Career Advice</Link>}
        {!isLoggedIn && <Link href="/signup/company" className='hover:text-blue-600'>Register as Company</Link>}
    </div>
)
        }

        
    </div>
    </>
  )
}

export default Navbar