import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: {
    default: "Roxy Drakor — Nonton Drama Korea Subtitle Indonesia",
    template: "%s | Roxy Drakor",
  },
  description:
    "Nonton streaming drama Korea terbaru dan terpopuler dengan subtitle Indonesia secara gratis di Roxy Drakor.",
  openGraph: {
    siteName: "Roxy Drakor",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
