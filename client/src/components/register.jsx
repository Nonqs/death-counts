import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"

export default function Register() {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {

        e.preventDefault()

        try {

            const res = await axios.post("http://localhost:3000/auth/register", {
                email,
                password,
                username
            }, {
                withCredentials: true
            })

        } catch (e) {
            console.error(e)
        }

        router.push("/home")

    }

    return (
        <form
            className="w-full sm:w-4/6 lg:w-2/6"
            onSubmit={onSubmit}
        >

            <div
                className="border-4 radius rounded-xl p-5"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
                <div className="container flex flex-col">
                    <label className="font-bold">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="border-2"
                        onChange={(e) => { setEmail(e.target.value) }} />

                    <label className="font-bold">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="border-2"
                        onChange={(e) => { setUsername(e.target.value) }} />

                    <label className="font-bold">Password</label>
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
                        Register
                    </Button>
                </div>
            </div>
        </form>
    )
}
