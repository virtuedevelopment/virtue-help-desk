import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export async function GET(){
    const response = await fetch('https://gist.githubusercontent.com/virtuedevelopment/d1479fe911d377c35686fff1ea582eac/raw/6903abce75da26f55f378ecec674ad18430248ee/db.json')
    const tickets = await response.json()

    return NextResponse.json(tickets,{status:200})

}

export async function POST(request){
    const ticket = await request.json()
    const response = await fetch('https://gist.githubusercontent.com/virtuedevelopment/d1479fe911d377c35686fff1ea582eac/raw/6903abce75da26f55f378ecec674ad18430248ee/db.json',{
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(ticket)
    })

    const newTicket = await response.json()
    return NextResponse.json(newTicket,{status:201})
}