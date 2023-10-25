import { notFound } from 'next/navigation';
import React from 'react'



// Define the base URL
const baseURL = 'https://gist.githubusercontent.com/virtuedevelopment/d1479fe911d377c35686fff1ea582eac/raw/6903abce75da26f55f378ecec674ad18430248ee/';

export const dynamicParams = true

export async function generateMetadata({params}){
    return{
        title: `Virtue Helpdesk | Ticket id: #${params.id}`
    }
}

export async function generateStaticParams(){
    const res = await fetch(`${baseURL}`)
    const tickets = await res.json()
    
    return tickets.map((ticket) => ({
        id: ticket.id
    }))
}


//fetch data outsid the rendered material
async function getTicket(id) {

    //create loading
    await new Promise(resolve => setTimeout(resolve, 3000))

    const response = await fetch(`${baseURL}`, {next:{revalidate:60}})

    //send to page 404 if page not found or release const data
    if (!response.ok){
        notFound()
    }else{
        const data = await response.json()
        const ticket = data.find(ticket => ticket.id === id)

        if (ticket === undefined){
            notFound()
        }

        return ticket
    }
}


export default async function TicketDetails({ params }) {

    const ticket = await getTicket(params.id)

  return (
    <main>
        <nav>
            <h2>Ticket Details</h2>
        </nav>
        <div className="card">
            <h3>{ticket.title}</h3>
            <small>Created by {ticket.user_email}</small>
            <p>{ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
            </div>
        </div>
    </main>
  )
}
