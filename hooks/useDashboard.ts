// ✅ hooks/useDashboard.ts
"use client"

import { useEffect, useState } from "react";
import { DashboardData } from "@/types/dashboard";

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/dashboard");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading };
}