import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./(components)/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Authentication",
  description: "Learning authentication with next-auth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 `}>
        <Nav />
        <div className="m-2">{children}</div>
      </body>
    </html>
  );
}
