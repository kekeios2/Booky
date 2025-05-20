"use client";

import { FaRegBell } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationBell() {
  const { notifications, setNotifications, loading } = useNotifications();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteNotification = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, { method: "POST" });
      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      } else {
        console.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const res = await fetch("/api/notifications/read", { method: "POST" });
    if (res.ok) {
      setNotifications([]);
    } else {
      console.error("Failed to mark notifications as read");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className="relative p-2">
        <FaRegBell className="w-6 h-6 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#1c1f2e] text-[#f5d88c] shadow-2xl z-50 overflow-hidden border border-[#2f3245]">
          <div className="flex items-center justify-between p-4 border-b border-[#3c3f54]">
            <div className="flex items-center gap-2">
              <FaRegBell className="w-6 h-6 text-white" />
              <span className="font-semibold text-[#f5d88c]">
                Notifications
              </span>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-[#f5d88c] hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {loading ? (
            <p className="p-4 text-sm text-center text-gray-400">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="p-4 text-sm text-center text-[#a0a0a0]">
              No notifications.
            </p>
          ) : (
            <ul className="divide-y divide-[#2f3245] max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`flex justify-between items-center p-4 text-sm transition-colors duration-200 ${
                    !n.read ? "bg-[#292d40]" : "bg-transparent"
                  } hover:bg-[#35384c]`}
                >
                  <div>
                    <p className="font-semibold">{n.title}</p>
                    <p className="text-xs text-[#d1c6a2]">{n.body}</p>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => handleDeleteNotification(n.id)}
                      className="ml-4 text-xs text-[#f5d88c] border border-[#f5d88c33] rounded px-2 py-1 hover:bg-[#3a3d52]"
                    >
                      Read
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
