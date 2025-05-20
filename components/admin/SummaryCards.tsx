// ✅ components/admin/SummaryCards.tsx
import { FaUsers, FaBook, FaClipboardList } from "react-icons/fa";

export default function SummaryCards({
  users,
  books,
  requests,
}: {
  users: number;
  books: number;
  requests: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <Card title="Total Users" value={users} icon={<FaUsers />} />
      <Card title="Total Books" value={books} icon={<FaBook />} />
      <Card
        title="Borrow Requests"
        value={requests}
        icon={<FaClipboardList />}
      />
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded shadow p-4 text-center ">
      <div className="text-3xl mb-2 justify-self-center text-blue-500 ">{icon}</div>
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
