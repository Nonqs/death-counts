"use client"
import Login from "@/components/login";
import Register from "@/components/register";
import { useState } from "react";

export default function LoginPage() {

    const [login, setLogin] = useState()

    return (
        <div className="container mt-5 flex flex-col justify-center items-center">
        <div className="p-0 border-4 radius rounded-xl sm:w-4/6 md:w-3/6 lg:w-2/6 flex flex-col sm:flex-row justify-evenly m-5"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
            <button onClick={() => { setLogin(true) }} className={`${login ? "bg-white w-full sm:w-1/2 mb-2 sm:mb-0" : "w-full sm:w-1/2 mb-2 sm:mb-0"} radius md:rounded-s-lg font-bold`}>Login</button>
            <button onClick={() => { setLogin(false) }} className={`${login ? "w-full sm:w-1/2" : "bg-white w-full sm:w-1/2"} radius md:rounded-e-lg font-bold`}>Register</button>
        </div>
    
        {login
            ? (< Login />)
            : (<Register />)
        }
    </div>
    
    )
}