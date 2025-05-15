import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"));
const ProfileCard = dynamic(() => import("@/components/ProfileCard"));
const BorrowedBooks = dynamic(() => import("@/components/BorrowBooks/BorrowedBooks"));
const Footer = dynamic(() => import("@/components/Footer"));

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0F0F1C] to-[#181826]">
      <div className="bg-gradient-to-br from-[#0F0F1C] to-[#181826]">
        <Navbar />
      </div>
      <div className="p-15">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-[450px] h-[750px] mx-10 ">
            <ProfileCard />
          </div>
          <div className="flex-1 w-[600px]">
            <h2 className="text-2xl font-bold text-white mb-6">
              Borrowed books
            </h2>
            <BorrowedBooks />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
