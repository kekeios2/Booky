"use client"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FullBorrowRequest } from "@/types/dashboard";

export function useBorrowRequests() {
  const [requests, setRequests] = useState<FullBorrowRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch("/api/admin/borrow");
        const data = await res.json();
        setRequests(data.requests);
      } catch {
        toast.error("Failed to load borrow requests");
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  return { requests, setRequests, loading };
}
