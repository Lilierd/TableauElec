import { Header } from '@/components/header';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Header />
      <div className='hover:translate-x-2 transition-transform inline-block'>
        <Link href="/"><span className="">retour</span></Link>
      </div>
      {" "}
      <div className='hover:translate-x-2 transition-transform inline-block'>
        <Link href="/"><span className="">retour</span></Link>
      </div>
    </div>
  );
}