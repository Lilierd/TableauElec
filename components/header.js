"use client"

import { logOut } from "@/app/actions";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const router = useRouter();
  const [userid, setUserid] = useState(null);

  const logOff = async () => {
    await logOut();
    router.push('/login');
  }

  var cookies;
  
  try {cookies = useCookies();} catch(error) {
    cookies = null;
  }

  useEffect(() => {
    if(cookies)
      setUserid(cookies.get("userid"));
  });

  return (<>
    {userid && <header className='fixed top-0 left-0 right-0 border-b border-orange-400 p-2 flex justify-between'>
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
        <form action={async () => {
            logOff()
          }}>
            <button type="submit" className="hover:-translate-x-1 transition-all duration-300 inline-block hover:scale-110" id="decoButton" >Déconnexion</button></form>
      </div>
    </header>}
  </>);
}