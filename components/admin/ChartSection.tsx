// ✅ components/admin/ChartSection.tsx
import BorrowChart from "./BorrowChart";
import { ChartPoint } from "@/types/dashboard";

export default function ChartSection({ data }: { data: ChartPoint[] }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Borrow Activity</h2>
      <BorrowChart data={data} />
    </div>
  );
}