

import Image from 'next/image';
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <div className="h-[calc(100vh-5rem)]">
      
        <div className="inset-0 flex items-center justify-center text-white text-4xl font-bold z-20 flex-col h-full p-5">
          <h4 className="text-center mb-10 font-bold text-[3vh]">
            LLeva tu contador de muertes en tus juegos <br /> solo o con tu grupo de amigos
          </h4>
          <Button size="lg" variant="outline" className="text-black text-xl font-semibold ">Empieza ahora</Button>
        </div>
      </div>
    
  );
}