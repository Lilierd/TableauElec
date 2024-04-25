"use client"

import Link from "next/link";
import ConnectModal from "@/components/connexion/ConnectModal";
import { useState } from "react";

export function Header() {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (<>
    <header className='fixed top-0 left-0 right-0 border-b border-orange-400 p-2 flex justify-between'>
      <div className="hover:translate-x-1 hover:scale-110 duration-300 transition-all"><Link href="/">TableauElec</Link></div>
      <div><Link className="inline-block" href="/oldPage">oldPage</Link>
        {" | "}<Link className="inline-block" href="/oldPage/test">test</Link>
        {" | "}<Link className="inline-block" href="/calendrier">Calendrier</Link>
        {" | "}
        <div className="group inline-block"><Link href="/">Travaux<span className="group inline-block">&#129171;</span></Link>
          <div className="invisible absolute flex flex-col group-hover:visible bg-gray-300 border-l border-r border-gray-400 py-1 rounded">
            <Link className="hover:bg-gray-200 px-5" href='/activite'>Création</Link>
            <Link className="hover:bg-gray-200 px-5" href="/activite/liste">Liste</Link>
            <Link className="hover:bg-gray-200 px-5" href="/"></Link>
          </div>
        </div>
        {" | "}
        <div className="group inline-block"><Link href="/management">Management<span className="group inline-block">&#129171;</span></Link>
          <div className="invisible absolute flex flex-col group-hover:visible bg-gray-300 border-l border-r border-gray-400 py-1 rounded">
            <Link className="hover:bg-gray-200 px-5" href='/management/equipe'>Equipe</Link>
            {/* <Link className="hover:bg-gray-200 px-5" href="">Liste</Link> */}
            {/* <Link className="hover:bg-gray-200 px-5" href="/"></Link> */}
          </div>
        </div>
      </div>
      <div className='inline-block'>
        <Link className="hover:-translate-x-1 transition-all duration-300 inline-block hover:scale-110" id="connexionBouton" onClick={openModal} href="">Connexion</Link>
      </div>
    </header>
    {<ConnectModal isOpen={isOpen} />}
  </>);
}