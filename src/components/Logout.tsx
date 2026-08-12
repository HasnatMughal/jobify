"use client"

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
function Logout() {
    const router = useRouter()
    const Logout = async() => {
        try {
            const deleteRes = await fetch('/api/logout',{
                method:"POST"
            })
            if(deleteRes.ok){
                router.push('/')
                router.refresh()
            }
        } catch (error) {
            
        }
    }
    const [show, setShow] = useState(false)
  return (
    <div>

    
    <button onClick={() => setShow(true)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Logout</button>
    {show && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl flex flex-col gap-4">
                        <p className="font-medium">Are you sure you want to logout</p>
                        <div className="flex justify-between">
                            <button onClick={() => Logout()} className="bg-red-500 text-white px-4 py-2 rounded-lg">Yes, Logout</button>
                            <button onClick={() => setShow(false)} className="border px-4 py-2 rounded-lg">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            </div>
  )
}

export default Logout