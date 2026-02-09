//Importing metadata and fonts
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackButton from "./Components/UI/BackButton"

/*Font variables*/
//defines geistSansn function which returns a font object from the Geist font, but only the latin portion.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

//defines geistMono function which returns a font object from the Geist_Mono font, but only the latin portion.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


/*Metadata variable*/
export const metadata: Metadata = {
  title: "Support Match - Find Your Perfect NDIS Support Worker",
  description: "Connect with verified, experienced support workers across Australia. Smart matching, compliance tracking, and human support for NDIS participants and coordinators.",
  keywords: ["NDIS", "support workers", "disability support", "Australia"],
  openGraph: {
    title: "Support Match - Find Your Perfect NDIS Support Worker",
    description: "Connect with verified, experienced support workers across Australia.",
    type: "website",
  },
};


/*Defining the deault html layout of - RootLayout*/
/*Next.js automatically takes whatever you return from the page and passes it as the children prop to the RootLayout.*/
export default function RootLayout({
  children, // name of our prop that will contain the children of the layout
}: Readonly<{ //Sets the prop as readonly 
  children: React.ReactNode; //Sets childrens type to be of a react type
//Sets language to english, set our fonts that we defined eariler and uses the tailwind untility class antialiased on the text.
}>) {
  return (
    <html lang="en">
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
        <BackButton />
        {children}
    </body>
    </html>
  );
}
