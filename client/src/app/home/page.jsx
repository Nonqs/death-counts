"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export default function UserPage() {

    const router = useRouter()

    const [groups, setGroups] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/group", {
                    withCredentials: true
                });
                const data = res.data
                setGroups(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return (
        <div>

            {groups &&
                <div className="container mt-5 flex flex-col justify-center items-center">
                    <div className="bg-white border-4 radius rounded-xl sm:w-4/6 md:w-3/6 lg:w-2/6 flex flex-col sm:flex-row justify-evenly m-5">
                        <article>
                            <h3>{groups.user}</h3>
                        </article>
                    </div>
                    {groups.data && groups.data.map(group => (
                        <div key={group.name} className="border-4 radius rounded-xl sm:w-4/6 md:w-3/6 lg:w-2/6 flex flex-col sm:flex-row justify-evenly m-5" style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
                            <Link key={group.name} href={`/home/${group.name}`}>

                                <article>
                                    <h3>{group.name}</h3>
                                </article>
                                <article>
                                    <span>{group.createdBy}</span>
                                    <span>{group.createdAt}</span>
                                </article>

                            </Link>
                        </div>
                    ))}
                    <section className="flex justify-center align-middle">
                        <div className="border-4 radius rounded-xl sm:w-4/6 md:w-3/6 lg:w-2/6 flex flex-col sm:flex-row justify-evenly m-5"
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                            <Link href="/home/create-group">
                                <button className="hover:bg-white h-full w-full rounded-lg">+ Create new group</button>
                            </Link>
                        </div>
                        <div className="border-4 radius rounded-xl sm:w-4/6 md:w-3/6 lg:w-2/6 flex flex-col sm:flex-row justify-evenly m-5"
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
                            <Link href="/home/join-group">
                                <button className="hover:bg-white h-full w-full rounded-lg">+ Join new group</button>
                            </Link>
                        </div>
                    </section>
                </div>
            }
        </div>
    )
}