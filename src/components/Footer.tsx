"use client"
import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 mt-auto">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold">Jobify</h2>
        <p className="text-gray-400 text-sm">© 2026 Jobify. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/">Home</Link>
            <Link href="/jobs">Jobs</Link>
            <Link href="/career-advice">Career Advice</Link>
        </div>
    </div>
</footer>
  )
}

export default Footer