import React from 'react'
import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'

//fetch data outsid the rendered material
async function getTickets() {
    const supabase = createServerComponentClient({cookies})
    const {data,error} = await supabase.from('tickets')
    .select()

    if (error){
        console.log(error.message)
    }

    return data
}

export default async function TicketList() {

    //initialize response data to be used in the render statement
    const tickets = await getTickets()

  return (
    <>
       {tickets.map((ticket) => (
            <div key={ticket.id} className='card my-5' >
                <Link href={`/tickets/${ticket.id}`}>
                    <h3>{ticket.Title}</h3>
                    <p>{ticket.Body.slice(0,200)}...</p>
                    <div className={`pill ${ticket.Priority}`}>
                        {ticket.Priority} priority
                    </div>
                </Link>
            </div>
        ))}
        {tickets.length === 0 && (
            <p className='text-center'>There are no open tickets</p>
        )}
    </>
  )
}
