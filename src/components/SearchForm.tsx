import React, { useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

function SearchForm() {
    const [jobTitle, setJobTitle] = useState('')
    const [location, setLocation] = useState('')
    const router = useRouter()

    const handleSubmit =  () => {
        router.push(`/?title=${jobTitle}&location=${location}`)
    }
  return (
    <form className="flex flex-col md:flex-row gap-2 p-2  bg-white rounded-2xl items-center justify-center w-fit mx-auto" onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
    }} >
          <div className="flex items-center">
          <FiSearch className="text-black" />
          <input type="text" className="p-2 md:w-96 text-gray-700 rounded-2xl focus:border-gray-50 " placeholder="Enter the job title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </div>
          <div className="flex items-center ">
            <MdLocationOn  className="text-black text-2xl"/>
          <input type="text" className="p-2 md:w-96 text-gray-700 rounded-2xl focus:border-gray-50 " placeholder="Enter the city, country" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <button type='submit' className="bg-blue-600 hover:bg-blue-700 w-full px-4 py-2 rounded-2xl text-white">Find Job</button>
        </form>
  )
}

export default SearchForm