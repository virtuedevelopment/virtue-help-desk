import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from './vlogo.png'
import { Span } from 'next/dist/trace'
import LogOutButton from './LogOutButton'

export default function Navbar({user}) {
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
        <Link href='/tickets' className='mr-auto'>Tickets</Link>
        {user && <span>Hello, {user.email}</span>}
        <LogOutButton />
    </nav>
  )
}
