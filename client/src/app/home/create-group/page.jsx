"use client"

import { useState } from "react"
import axios from "axios"

export default function CreatePage(){
    
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async(e) =>{

        e.preventDefault()

        try{

            const res = axios.post("http://localhost:3000/group/create",{
                name,
                password
            },{
                withCredentials: true
            })

        } catch(e){
            console.error(e)
        }
    }

    return(

        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={(e)=>{setName(e.target.value)}}/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} />
                <button>Enviar</button>
            </form>
        </div>

    )
}