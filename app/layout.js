import {Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/Whatsapp";



const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable}`}>
      <body className="antialiased bg-black text-white">
          <Navbar/>
          <WhatsAppFloating/>
          {children}
          <Footer/>
      </body>
    </html>
  );
}
