"use client"

import React from 'react'
import { useRouter } from 'next/navigation'


function RemoveCV() {
    const router = useRouter()

    const removeCv = async() => {
        try {
            await fetch('/api/user/update',{
                method:"POST",
                body:JSON.stringify({cvUrl:""})
            })
            router.refresh()
        } catch (error) {
            
        }
    }
  return (
   <button className='text-sm' onClick={() => removeCv()}>Remove CV</button>
  )
}

export default RemoveCV