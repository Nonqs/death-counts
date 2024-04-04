"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import "./group.css"

export default function GroupPage({ params }) {

    const router = useRouter()

    const [group, setGroup] = useState()
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const groupName = params.group


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/group/${groupName}`, {
                    withCredentials: true
                });
                setGroup(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [groupName, updateTrigger]);

    const newDeath = async () => {
        try {
            const res = await axios.patch(`http://localhost:3000/group/${groupName}`, {}, {
                withCredentials: true
            });

            setUpdateTrigger(prev => !prev);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full mt-10">
            <section className="w-2/5 border-2 border-white" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                <h3 className="text-center font-bold">Members</h3>
                {group && group.members.map(member => (
                    <div key={member.name} className="border-2 border-white">
                        <h4>{member.name}</h4>
                        <span>Deaths: {member.deaths}</span>
                    </div>
                ))}
            </section>
            <section className="w-2/5 border-2 border-white relative" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
                <button className="new-death-button w-full" onClick={newDeath}><span className="span-button">New death</span></button>
            </section>
        </div>


    )
}