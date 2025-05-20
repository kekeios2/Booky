// ✅ components/admin/RecentUsers.tsx
import { UserPreview } from "@/types/dashboard";

export default function RecentUsers({ users }: { users: UserPreview[] }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Recent Users</h2>
      <ul className="divide-y text-sm">
        {users.map((user) => (
          <li key={user.id} className="py-2 flex justify-between">
            <span>{user.fullName || user.email}</span>
            <span className="text-gray-500">
              joined: {new Date(user.createdAt).toLocaleDateString("en-EG")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}