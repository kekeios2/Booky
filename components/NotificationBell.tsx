"use client";

import { FaRegBell } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleDeleteNotification = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, { method: "DELETE" });

      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      } else {
        console.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBellClick = () => {
    setOpen(!open);
  };

  const handleMarkAllAsRead = async () => {
    const res = await fetch("/api/notifications/read", { method: "POST" });
    if (res.ok) {
      setNotifications([]); // حذف جميع الإشعارات من الواجهة
    } else {
      console.error("Failed to delete all notifications");
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleBellClick} className="relative p-2">
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
              <svg
                className="w-5 h-5 text-[#f5d88c]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 17h5l-1.405-1.405C18.195 14.785 18 13.918 18 13V9a6 6 0 00-5-5.917V3a1 1 0 10-2 0v.083A6 6 0 006 9v4c0 .918-.195 1.785-.595 2.595L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
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
          <ul className="divide-y divide-[#2f3245] max-h-72 overflow-y-auto">
            {notifications.map((n, idx) => (
              <li
                key={idx}
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
            {notifications.length === 0 && (
              <li className="p-4 text-sm text-center text-[#a0a0a0]">
                No notifications.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
