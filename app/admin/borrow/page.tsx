import { BorrowRequestsTable } from "@/components/admin/BorrowReqTable";
import React from "react";

const BorrowPage = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Borrow Req Management</h1>
      </div>
      <BorrowRequestsTable />
    </section>
  );
};
export default BorrowPage;
