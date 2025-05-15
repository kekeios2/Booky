"use client";
import { useState, useRef, useEffect } from "react";

type RoleDropdownProps = {
  currentRole: string;
  onChange: (role: string) => void;
};

export function RoleDropdown({ currentRole, onChange }: RoleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Available roles
  const roles = ["User", "Admin", "Librarian"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "Librarian":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-[#00800040] text-[#008000]";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${getRoleColor(
          currentRole
        )}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentRole}
        <svg
          className="ml-1.5 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => {
                  onChange(role);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  role === currentRole ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
                role="menuitem"
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
