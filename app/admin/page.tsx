import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardCard from "@/components/admin/DashboardCard";
import { FaUsers, FaBook, FaClipboardList } from "react-icons/fa";
import { prisma } from "@/lib/prisma";
import BorrowChart from "@/components/admin/BorrowChart";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  console.log(session); // تحقق من الجلسة

  if (!session || session.user.role !== "Admin") {
    redirect("/"); // إعادة التوجيه إذا لم يكن المستخدم "Admin"
  }
  const latestUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  const latestBorrow = await prisma.borrow.findMany({
    orderBy: { borrowedAt: "desc" },
    take: 5,
    include: {
      user: true,
      book: true,
    },
  });
  const activity = await prisma.borrow.groupBy({
    by: ["borrowedAt"],
    _count: { _all: true },
    orderBy: { borrowedAt: "asc" },
  });
  const chartData = activity.map((item) => ({
    date: new Date(item.borrowedAt).toLocaleDateString("en-EG"),
    count: item._count._all,
  }));
  // Fetch real stats here in a real app
  const totalUsers = await prisma.user.count();
  const totalBooks = await prisma.book.count();
  const borrowRequests = await prisma.borrow.count({
    where: { status: "PENDING" },
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <DashboardCard
            title="Total Users"
            value={totalUsers}
            icon={<FaUsers />}
          />
          <DashboardCard
            title="Total Books"
            value={totalBooks}
            icon={<FaBook />}
          />
          <DashboardCard
            title="Borrow Requests"
            value={borrowRequests}
            icon={<FaClipboardList />}
          />
        </div>

        {/* Charts & Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Placeholder */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Borrow Activity</h2>
            <BorrowChart data={chartData} />
          </div>

          {/* New Users */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Recent Users</h2>
            <ul className="divide-y text-sm">
              {latestUsers.map((user) => (
                <li key={user.id} className="py-2 flex justify-between">
                  <span>{user.fullName || user.email}</span>
                  <span className="text-gray-500">
                    joind:{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-EG")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Borrow Table */}
        <div className="bg-white rounded shadow p-4 mt-8">
          <h2 className="text-lg font-semibold mb-2">Recent Borrow Requests</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left p-2">User</th>
                <th className="text-left p-2">Book</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {latestBorrow.map((borrow) => (
                <tr key={borrow.id} className="border-b">
                  <td className="p-2">
                    {borrow.user?.fullName || borrow.user?.email}
                  </td>
                  <td className="p-2">{borrow.book?.title}</td>
                  <td className="p-2 text-gray-500">
                    {new Date(borrow.borrowedAt).toLocaleDateString("en-EG")}
                  </td>
                  <td
                    className={`p-2 font-medium ${
                      borrow.status === "APPROVED"
                        ? "text-green-600"
                        : borrow.status === "REJECTED"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {borrow.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
