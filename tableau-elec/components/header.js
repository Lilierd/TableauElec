"use client"

import Link from "next/link";
import ConnectModal from "@/components/connexion/ConnectModal";
import { useState, useEffect } from "react";

export function Header() {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (<>
    <header className='border-b border-gray-400 p-2 flex justify-between'>
      <div><Link href="/">TableauElec</Link></div>
      <div><Link className="hover:-translate-x-1 transition-all inline-block" href="/oldPage">oldPage</Link>
        {" | "}<Link className="hover:-translate-x-1 transition-all inline-block" href="/oldPage/test">test</Link></div>
      <div className='inline-block'>
        <Link className="hover:-translate-x-1 transition-all inline-block hover:text-orange-600" id="connexionBouton" onClick={openModal} href="">Connexion</Link>
      </div>
    </header>
    {<ConnectModal isOpen={isOpen} />}
  </>);
}