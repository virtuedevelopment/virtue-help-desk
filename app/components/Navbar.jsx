import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from './vlogo.png'

export default function Navbar() {
  return (
    <nav>
        <Image 
          src={Logo}
          alt='Virtue Logo'
          width={70}
          quality={100}
          placeholder='blur'
        />
        <h1>Virtue Helpdesk</h1>
        <Link href='/'>Dashboard</Link>
        <Link href='/tickets' >Tickets</Link>
    </nav>
  )
}
