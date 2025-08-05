import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MyNav from "./compo/myNav.jsx";
import { UserTokenProvider } from "./store/UserContext";
import Footer from "./compo/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MythicaVault",
  description: "Explore the myths around you",
  icons: {
    icon: "/imgs/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#0E0E12] min-h-screen  text-white`}
      >
        <UserTokenProvider>
          <MyNav />
          {children}
          <Footer />
        </UserTokenProvider>
      </body>
    </html>
  );
}
