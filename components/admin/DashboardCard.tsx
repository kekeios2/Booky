"use client";
import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center text-center">
      {icon && <div className="text-blue-500 text-3xl mb-2">{icon}</div>}
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-gray-800 mt-1">{value}</div>
    </div>
  );
};

export default DashboardCard;
