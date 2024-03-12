"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function LoginPage() {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {

        e.preventDefault()

        try {

            const res = await axios.post("http://localhost:3000/auth/login", {
                email,
                password
            }, {
                withCredentials : true
            }
            )

        } catch (e) {
            console.error(e)
        }

        router.push("/home")

    }

    return (
        <div>
            <form className="flex flex-col" onSubmit={onSubmit}>
                <input type="email" name="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" name="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
                <button>Enviar</button>
            </form>
        </div>
    )
}