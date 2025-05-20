"use client";

import React from "react";
import { useBorrowRequests } from "@/hooks/useBorrowRequests";
import BorrowRequestsTable from "@/components/admin/BorrowReqTable";

const BorrowClient = () => {
  const { requests, setRequests } = useBorrowRequests();

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Borrow Req Management</h1>
      </div>
      <BorrowRequestsTable
        data={requests}
        onApprove={(id) =>
          setRequests((prev) => prev.filter((r) => r.id !== id))
        }
      />
    </section>
  );
};

export default BorrowClient;
