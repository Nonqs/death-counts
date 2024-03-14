import icon from "@/../public/icon.svg"
import Image from 'next/image';
import Link from "next/link";

export default function NavBar() {
    return (
        <div className="h-20 w-full ">
            <div className="ms-10 me-10 h-full">
                <nav className="h-full flex items-center ">
                    <Link href="/">
                        <article className="h-full flex items-center ">
                            <Image src={icon} alt="Icono" className="lg:w-10 md:w-4" />
                            <h2 className="text-white lg:text-2xl md:text-xl">DEATH COUNTS</h2>
                        </article>
                    </Link>
                    <Link href="/home">
                        <button className=" ms-5 border lg:text-2xl md:text-xl border-solid border-transparent hover:border-white px-4 py-2 rounded-lg text-white">Home</button>
                    </Link>
                    <Link href="/auth">
                        <button className=" ms-5 border lg:text-2xl md:text-xl border-solid border-transparent hover:border-white px-4 py-2 rounded-lg text-white">Login</button>
                    </Link>
                </nav>
            </div>
        </div>
    )
}

