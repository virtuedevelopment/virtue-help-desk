"use client"

import React, {useState} from 'react'
import { useRouter } from 'next/navigation'

export default function CreateForm() {
    
    const router = useRouter()

    const [ticketError, setTicketError] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody]  = useState('')
    const [priority, setPriority]  = useState('low')
    const [isLoading, setIsLoading] = useState(false)

    //handle the submit
    const HandleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)

        const ticket = {title, body, priority}

        const response = await fetch('http://localhost:3000/api/tickets',{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(ticket)
        })

        const json = await response.json()

        if(!json.error === null){
            setIsLoading(false)
            setTicketError(true)
        }
        if (json.tickets){
            router.refresh()
            router.push('/tickets')
        }

    }

  return (
    <form onSubmit={HandleSubmit} className='w-1/2'>
            <label>
                <span>Title:</span>
                <input
                required 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                />
            </label>
            <label>
                <span>Issue You are facing:</span>
                <textarea
                required
                onChange={(e) => setBody(e.target.value)}
                value={body}
                />
            </label>
            <label>
                <span>Priority:</span>
                <select 
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
                >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                </select>
            </label>
            <button 
                className="btn-primary" 
                disabled={isLoading}
            >
            {isLoading && <span>Adding...</span>}
            {!isLoading && <span>Add Ticket</span>}
            </button>
            {ticketError && (<div className='text-center error'>Error uploading your ticket</div>)}
    </form>
  )
}
