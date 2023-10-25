import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export async function GET(_, {params}){

    const baseURL = 'https://gist.githubusercontent.com/virtuedevelopment/d1479fe911d377c35686fff1ea582eac/raw/6903abce75da26f55f378ecec674ad18430248ee/';

    const response = await fetch(`${baseURL}`)
    const tickets = await response.json()

    if (!response.ok){
        return NextResponse.json({error: 'Cannot find ticket'})
    }

    return NextResponse.json(tickets.map((ticket) => ({ id: ticket.id},{status:404})),{status:200})

}
