"use client"
import { useState } from "react"

export default function DeleteConfirm({ onConfirm }: { onConfirm: () => void }) {
    const [show, setShow] = useState(false)

    return (
        <div>
            <button onClick={() => setShow(true)} className="bg-red-600 border hover:bg-red-700  py-3 rounded-lg max-w-lg w-full text-white">Delete</button>
            {show && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl flex flex-col gap-4">
                        <p className="font-medium">Are you sure you want to delete this job?</p>
                        <div className="flex gap-4">
                            <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded-lg">Yes, Delete</button>
                            <button onClick={() => setShow(false)} className="border px-4 py-2 rounded-lg">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}