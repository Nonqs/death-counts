import { Inter } from "next/font/google";
import { Marcellus } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";


const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Death count app",
  description: "keep your death count with your friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={marcellus.className}>

        <div className="relative h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm"
            style={{ backgroundImage: "url('/elden.jpg')", zIndex: -1 }}
          >
            <div className="w-100 bottom-0 h-full bg-gradient-to-t from-black to-transparent" />

          </div>
          <div className="relative z-10 h-full">
            <NavBar />
            {children}
          </div>
        </div>


      </body>
    </html>
  );
}
