"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function JoinPage() {

    const router = useRouter()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {

        e.preventDefault()

        try {

            const res = axios.post("http://localhost:3000/group/join", {
                name,
                password
            }, {
                withCredentials: true
            })

        } catch (e) {
            console.error(e)
        }

        router.push(`/home/${name}`)

    }

    return (
        <div className="w-full flex justify-center align-middle mt-10">
            <form
                className="w-full sm:w-4/6 lg:w-2/6"
                onSubmit={onSubmit}
            >
                <div
                    className="border-4 radius rounded-xl p-5"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                >
                    <div className="container flex flex-col">
                        <label className="font-bold">Group name</label>
                        <input
                            type="text"
                            className="border-2"
                            onChange={(e) => { setName(e.target.value) }} />

                        <label className="font-bold">Group password</label>
                        <input
                            type="password"
                            name="password"
                            className="border-2"
                            id="password"
                            onChange={(e) => { setPassword(e.target.value) }} />

                        <Button
                            variant="outline"
                            className="text-black font-semibold h-1/10 mt-4"
                        >
                            Join
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}