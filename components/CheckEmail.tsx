// components/CheckEmail.tsx
"use client";
import React from "react";
import { IoMailOutline } from "react-icons/io5";
import SendEmail from "./SendEmail";

export default function CheckEmail({ email }: { email: string }) {
  return (
    <section>
      <div
        className="min-h-screen flex flex-col justify-center items-center text-white px-4"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/xt6hfeibgz/Ui-Images/EXPORT-BG.png?updatedAt=1747251088255')",
          backgroundSize: "cover",
        }}
      >
        <div className="mb-6">
          <IoMailOutline size={80} />
        </div>

        <h2 className="text-xl font-semibold mb-2">
          Hey, your inbox just got some action!
        </h2>

        <div className="text-center text-gray-300 max-w-xs mb-2">
          We just sent a verification link to <br />
          <span className="font-medium">{email}</span>
        </div>

        <SendEmail email={email} />

        <div className="text-center text-gray-300 max-w-xs mb-6">
          Don't leave it hanging — it hates waiting!
        </div>

        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-[#c9af90] text-black px-6 py-2 rounded hover:bg-[#a79278] transition shadow-lg cursor-pointer"
          title="Don't waste time, go login now!"
        >
          Dash to Login →
        </button>
      </div>
    </section>
  );
}
