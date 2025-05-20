// app/profile/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import TabsWrapper from "@/components/TabsWrapper";

const ProfileCard = dynamic(() => import("@/components/ProfileCard"));

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <section className="min-h-screen bg-[#121829] px-8 pb-20">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-[400px]">
          <ProfileCard />
        </div>

        <div className="flex-1">
          <TabsWrapper />
        </div>
      </div>
    </section>
  );
}


