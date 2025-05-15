"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";

type BorrowRequest = {
  id: number;
  status: string;
  createdAt: string;
  borrowedAt:string;
  user: {
    id: number;
    fullName: string;
    email: string;
    image: string | null;
  };
  book: {
    id: number;
    title: string;
  };
};

export function BorrowRequestsTable() {
  const [requests, setRequests] = useState<BorrowRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/admin/borrow");
        const data = await res.json();
        setRequests(data.requests);
      } catch (err) {
        toast.error("Failed to load borrow requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAction = async (id: number, action: "APPROVED" | "REJECTED") => {
    try {
      const res = await fetch("/api/borrow/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ borrowId: id, action }),
      });

      if (!res.ok) throw new Error("Failed to update request");

      setRequests((prev) => prev.filter((r) => r.id !== id));
      toast.success(`Request ${action.toLowerCase()} successfully`);
    } catch (err) {
      toast.error("Failed to update request");
    }
  };

  if (loading) return <p>Loading borrow requests...</p>;

  if (requests.length === 0)
    return <p className="text-gray-500">No pending borrow requests.</p>;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase border-b">
          <tr>
            <th className="p-2">User</th>
            <th className="p-2">Book</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-b hover:bg-gray-50">
              <td className="p-2 flex items-center gap-2">
                {req.user.image ? (
                  <Image
                    src={req.user.image}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
                    {req.user.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-medium">{req.user.fullName}</div>
                  <div className="text-xs text-gray-500">{req.user.email}</div>
                </div>
              </td>
              <td className="p-2 font-medium">{req.book.title}</td>
              <td className="p-2 text-gray-500">
                {new Date(req.borrowedAt).toLocaleDateString("en-EG")}
              </td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleAction(req.id, "APPROVED")}
                  className="flex items-center gap-1 text-green-600 hover:underline"
                >
                  <FaRegCheckCircle className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => handleAction(req.id, "REJECTED")}
                  className="flex items-center gap-1 text-red-600 hover:underline"
                >
                  <FiXCircle className="w-4 h-4" />
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
