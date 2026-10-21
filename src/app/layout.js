import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HideOnAdmin from "@/components/HideOnAdmin";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: {
    default: "SMA Islam Annajah | Annajah Islamic School Jakarta",
    template: "%s | SMA Islam Annajah",
  },
  description: "Profil resmi SMA Islam Annajah: sekolah berbasis nilai Islam, ilmu pengetahuan dan teknologi, serta pengembangan bakat, minat, dan kreativitas siswa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans flex min-h-screen flex-col">
        <HideOnAdmin>
          <Navbar />
        </HideOnAdmin>
        <main className="flex-1">{children}</main>
        <HideOnAdmin>
          <Footer />
        </HideOnAdmin>
      </body>
    </html>
  );
}
