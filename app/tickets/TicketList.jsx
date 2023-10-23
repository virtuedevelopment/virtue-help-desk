import React from 'react'
import Link from 'next/link'

//fetch data outsid the rendered material
async function getTickets() {
    const response = await fetch('https://gist.githubusercontent.com/virtuedevelopment/d1479fe911d377c35686fff1ea582eac/raw/6903abce75da26f55f378ecec674ad18430248ee/db.json', {next:{revalidate:0}})
    return response.json()
}

export default async function TicketList() {

    //initialize response data to be used in the render statement
    const tickets = await getTickets()

  return (
    <>
       {tickets.map((ticket) => (
            <div key={ticket.id} className='card my-5' >
                <Link href={`/tickets/${ticket.id}`}>
                    <h3>{ticket.title}</h3>
                    <p>{ticket.body.slice(0,200)}...</p>
                    <div className={`pill ${ticket.priority}`}>
                        {ticket.priority} priority
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
