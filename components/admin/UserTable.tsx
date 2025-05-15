"use client";
import { useState, useEffect } from "react";
import { RoleDropdown } from "./RoleDropdown";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-hot-toast";
import { LuTrash2 ,LuUserPen  } from "react-icons/lu";

// Define the User type
type User = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  borrows: number;
  univId: number;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching users");
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );

      toast.success("User role updated successfully");
    } catch (err) {
      toast.error("Failed to update user role");
      console.error("Error updating user role:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the user from the local state
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Failed to delete user");
      console.error("Error deleting user:", err);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (err) {
      return "Invalid date";
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
        {error}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 p-8 rounded-xl text-center">
        No users found in the system.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 ">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase border-b">
          <tr>
            <th className="p-2">Profile</th>
            <th className="p-2">Name</th>
            <th className="p-2">Date Joined</th>
            <th className="p-2">Role</th>
            <th className="p-2">Books Borrowed</th>
            <th className="p-2">University ID</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Updated At</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.fullName || "User avatar"}
                      fill
                      sizes="40px"
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/images/default-avatar.jpg";
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-gray-300 text-gray-600">
                      {user.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </td>
              <td className="p-2">
                <div className="font-medium">{user.fullName}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </td>

              <td className="p-2">{formatDate(user.createdAt)}</td>
              <td className="p-2">
                <RoleDropdown
                  currentRole={user.role}
                  onChange={(role) => handleRoleChange(user.id, role)}
                />
              </td>
              <td className="p-2">{user.borrows}</td>
              <td className="p-2">{user.univId}</td>
              <td className="p-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2">
                {new Date(user.updatedAt).toLocaleDateString()}
              </td>
              <td className="p-2 ">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-gray-500 hover:text-red-700 "
                  aria-label="Delete user"
                >
                  <LuTrash2 />
                </button>
          
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
