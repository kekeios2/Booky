"use client";

import { useDashboard } from "@/hooks/useDashboard";
import SummaryCards from "@/components/admin/SummaryCards";
import ChartSection from "@/components/admin/ChartSection";
import RecentUsers from "@/components/admin/RecentUsers";
import BorrowRequestsTable from "@/components/admin/BorrowReqTable";
import { useBorrowRequests } from "@/hooks/useBorrowRequests";

export default function DashboardClient() {
  const { data, loading } = useDashboard();
  const { requests, setRequests } = useBorrowRequests();

  if (loading || !data) return <p className="p-4">Loading dashboard...</p>;

  return (
    <main className="p-6">
      <SummaryCards
        users={data.totalUsers}
        books={data.totalBooks}
        requests={data.borrowRequests}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSection data={data.chartData} />
        <RecentUsers users={data.latestUsers} />
      </div>
      <BorrowRequestsTable
        data={requests}
        onApprove={(id) =>
          setRequests((prev) => prev.filter((r) => r.id !== id))
        }
      />
    </main>
  );
}
