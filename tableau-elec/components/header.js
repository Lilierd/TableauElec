"use client"

import Link from "next/link";
import ConnectModal from "@/components/connexion/ConnectModal";
import { useState, useEffect } from "react";

export function Header() {
  const [opened, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    document.addEventListener('click', function (event) {
      if (event.target != null)
        if (event.target.id === "modal" || event.target.id === "submit" || event.target.id === "croix1") {
          event.stopPropagation();
          closeModal();
        }
    });
  })

  return (<>
    <header className='border-b border-gray-400 p-2 flex justify-between'>
      <div><Link href="/">TableauElec</Link></div>
      <div><Link href="/oldPage">oldPage</Link>
        {" | "}<Link href="/oldPage/test">test</Link></div>
      <div className='inline-block'>
        <Link className="hover:-translate-x-1 transition-all inline-block hover:text-yellow-200" onClick={openModal} href="">Connexion</Link>
      </div>
    </header>
    <div><ConnectModal isOpen={opened} /></div>
  </>);
}