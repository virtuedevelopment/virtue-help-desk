import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react'


export const dynamicParams = true

export async function generateMetadata({params}){

    const supabase = createServerComponentClient({cookies})

    const {data: ticket} = await supabase.from('tickets')
    .select()
    .eq('id',params.id)
    .single()

    return{
        title: `Virtue Helpdesk | ${ticket?.Title || 'Ticket not found'}`
    }
}





//fetch data outsid the rendered material
async function getTicket(id) {

    //imitate delay
    await new Promise(resolve => setTimeout(resolve,3000))

    const supabase = createServerComponentClient({cookies})

    const {data} = await supabase.from('tickets')
    .select()
    .eq('id',id)
    .single()

    if(!data){
        notFound()
    }
    return data
}


export default async function TicketDetails({ params }) {

    const ticket = await getTicket(params.id)

  return (
    <main>
        <nav>
            <h2>Ticket Details</h2>
        </nav>
        <div className="card">
            <h3>{ticket.Title}</h3>
            <small>Created by {ticket.user_email}</small>
            <p>{ticket.Body}</p>
            <div className={`pill ${ticket.Priority}`}>
                {ticket.Priority} priority
            </div>
        </div>
    </main>
  )
}
