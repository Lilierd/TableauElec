import Link from 'next/link';
import ConnectModal from '@/components/ConnectModal';
import React from 'react';
import { Button, Form, Input } from 'reactstrap';

export default function Home() {
  return (
    <div>
      <header className='border-b p-2 flex justify-between'>
        <div><Link href="/oldPage">oldPage</Link></div>
        <div><Link href="/oldPage/test">test</Link></div>
        <div className='inline-block'>
          <Link className="hover:-translate-x-1 transition-all inline-block hover:text-yellow-200" href="/">Connexion</Link>
        </div>
      </header>
      <div>
        patate
      </div>
    </div>
  );
}