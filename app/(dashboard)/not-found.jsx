import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <main className="text-center">
        <h2 className="text-3xl">There was a problem.</h2>
        <p>We could not find the page you were looking for.</p>
        <p>Go back to the dashboard <Link href='/'>Dashboard</Link></p>
      </main>
    </div>
  )
}
