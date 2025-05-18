"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfileCard() {
  const { data: session } = useSession();

  return (
    <section>
      <div className="bg-[#1E1E2D] rounded-2xl p-6 shadow-lg">
        <div>
          <Image
            className=" relative justify-self-center top-[-40px]"
            width={50}
            height={80}
            src="/images/pin.png"
            alt="pin"
          />
        </div>

        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-[100px] h-[100px] rounded-[50px] overflow-hidden bg-[#28283a] p-1">
              <Image
                src={session?.user?.image || "/images/noUser.png"}
                alt="Profile"
                width={80}
                height={80}
                className="object-cover w-[100px] "
              />
            </div>

            <div className="">
              <div className="flex items-center gap-1 mb-1">
                <Image
                  width={18}
                  height={18}
                  src="/images/Vector.png"
                  alt="Verified"
                />
                <span className="text-gray-300 text-xs text-[14px]">
                  Verified Student
                </span>
              </div>
              <h3 className="text-white text-lg font-semibold text-[24px] py-1">
                {session?.user?.fullName || "Adrian"}
              </h3>
              <p className="text-gray-400 text-sm text-[18px]">
                {session?.user?.email || "contact@jsmastery.pro"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className=" pb-4 border-b border-[#2A2A3A]">
              <p className="text-gray-400 text-sm mb-1">Student ID</p>
              <p className="text-white font-medium">
                {session?.user?.univId || "80765432"}
              </p>
            </div>

            <div className="pt-2">
              <p className="text-gray-400 text-sm mb-4 font-bold">
                All Information :
              </p>

              <div className="space-y-2">
                <div>
                  <p className="text-gray-400 text-xs">Role</p>
                  <p className="text-white text-sm">
                    {session?.user?.role || "80765432"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Full Name</p>
                  <p className="text-white text-sm">
                    {session?.user?.fullName || "Adrian"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Email </p>
                  <p className="text-white text-sm">
                    {session?.user?.email || "contact@jsmastery.pro"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-gray-400 text-xs">
                University Inc + (966) 50-350-0921
              </p>
              <p className="text-gray-400 text-xs">Website: www.Booky.org</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
