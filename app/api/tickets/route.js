import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic'


export async function POST(request){
    const ticket = await request.json()
    
    //get supabase instance
    const supabase = createRouteHandlerClient({cookies})


    //get current user session
    const { data:{ session } } = await supabase.auth.getSession()
    

    //insert the data into supabase
    const { data: tickets, error } = await supabase.from('tickets')
        .insert({
            Title: ticket.title,
            Body: ticket.body,
            Priority: ticket.priority,
            user_email: session.user.email
        })
        .select()
        .single()
        
    return NextResponse.json({ tickets,error })
}