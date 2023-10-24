"use client"
import React, {useState} from 'react'
import { useRouter } from 'next/router'

export default function CreateForm() {
   // const router = useRouter()

    const [title, setTitle] = useState('')
    const [body, setBody]  = useState('')
    const [priority, setPriority]  = useState('low')
    const [isLoading, setIsLoading] = useState(false)

    //handle the submit
    const HandleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)

        const ticket = {
            title, body, priority, user_email: 'myguy@gmail.com'
        }

        const response = await fetch('https://gist.githubusercontent.com/virtuedevelopment/d1479fe911d377c35686fff1ea582eac/raw/6903abce75da26f55f378ecec674ad18430248ee/db.json',{
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(ticket)
        })

        if (response.status === 201){
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
    </form>
  )
}
