// app\(main)\layout.tsx
import "@/app/globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/NextAuthProviders";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-right" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </AuthProvider>
    </>
  );
}
