// app/layout.tsx
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/NextAuthProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="MainBody" className=" text-white">
        <AuthProvider>
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
