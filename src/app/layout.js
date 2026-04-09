import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: {
    default: "DramaHub — Nonton Drama Korea Subtitle Indonesia",
    template: "%s | DramaHub",
  },
  description:
    "Nonton streaming drama Korea terbaru dan terpopuler dengan subtitle Indonesia secara gratis di DramaHub.",
  openGraph: {
    siteName: "DramaHub",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0d0d0d] text-white antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
