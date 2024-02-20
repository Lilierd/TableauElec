import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';

const YourComponent = () => (
	<Image
		src="/images/churchill.jpg" // Route of the image file
		height={412} // Desired size with correct aspect ratio
		width={330} // Desired size with correct aspect ratio
		alt="Lilierd"
	/>
);

export default function FirstPost() {
	return (
		<Layout>
			<Head>
				<title>First Post</title>
				<Script
					src="https://connect.facebook.net/en_US/sdk.js"
					strategy="lazyOnload"
					onLoad={() =>
						console.log(`script loaded correctly, window.FB has been populated`)
					}
				/>
			</Head>
			<h1 className="text-3xl font-bold underline">First Post</h1>
			<h2>
				<Link href="/">← Back to home</Link>
			</h2>
		</Layout>
	);
}