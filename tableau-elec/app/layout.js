import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TableauElec",
  description: "Tableau de gestion des activités MRI Elec",
};

export default function RootLayout({ children }) {

  return (
    <html lang="fr">
      <body className={inter.className}><Header /><div className="mt-12 mx-8 p-2 border-x-2 border-gray-300">{children}</div></body>
    </html>
  );
}
