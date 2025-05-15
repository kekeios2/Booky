import { ReactNode } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  const adminName = session?.user?.fullName || "Admin";
  const adminEmail = session?.user?.email || "admin@example.com";

  return (
    <main className="flex min-h-screen w-full flex-row bg-white! text-black!">
      <Sidebar adminName={adminName} adminEmail={adminEmail} />
      <div className="flex w-[calc(100%-264px)] flex-1 flex-col p-5 xs:p-10">
        <Header adminName={adminName} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
