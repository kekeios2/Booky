// app\(admin)\admin\users\list\page.tsx
"use client";
import { UserTable } from "@/components/admin/UserTable";
import { CreateUserBtn } from "@/components/admin/CreateUserBtn";

const AdminPage = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <div className="space-x-2">
          <CreateUserBtn />
        </div>
      </div>
      <UserTable />
    </section>
  );
};
export default AdminPage;