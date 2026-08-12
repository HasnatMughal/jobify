import React from 'react'

type data = {
    seekerName:string,
    seekerMail:string,
    seekerPh:number,
    CV:string,
    onRejectFn:any,
     onAcceptFn:any,
     status:string
}

function Application({seekerName,seekerMail,seekerPh,CV,onRejectFn, onAcceptFn, status}:data) {
  return (
    <div className="flex flex-col gap-2 border border-gray-200 rounded-xl p-4 w-full">
    <h2 className="text-lg font-semibold">{seekerName}</h2>
    <p className="text-sm text-gray-500">{seekerMail}</p>
    <p className="text-sm text-gray-500">{seekerPh}</p>
    {CV && <a href={CV} target="_blank" className="text-blue-600 text-sm hover:underline">View CV</a>}
    <div className="flex gap-4 mt-2">
        {status === "pending" ? <>
        <button onClick={onAcceptFn} className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Accept</button>
        <button onClick={onRejectFn} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">Reject</button>
        </>: <p>Status: {status === "Accepted" ? <span className='text-green-500 text-sm'>{status}</span> : status === "Rejected" && <span className='text-red-500 text-sm'>{status}</span>}</p>}
        
    </div>
</div>
  )
}

export default Application