import Link from 'next/link';
import ConnectModal from '@/components/ConnectModal';
import React from 'react';
import { Button, Form, Input } from 'reactstrap';

export default function Home() {

  return (
    <main>
      <header className='border-b p-2 flex justify-between'>
        <div>test</div>
        <div>test1</div>
        <div className='flex'><Link className='' href="">test2</Link><div>test21</div></div>
      </header>
      <div>
      </div>
    </main>
  );
}