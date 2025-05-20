import { AuthProvider } from "@/providers/NextAuthProviders";
import "@/app/globals.css";

// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <><AuthProvider>{children}</AuthProvider></>
  );
}
