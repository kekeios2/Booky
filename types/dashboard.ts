// ✅ types/dashboard.ts
export type UserPreview = {
  id: string;
  fullName: string | null;
  email: string;
  createdAt: string;
};

export type BorrowEntry = {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  borrowedAt: string;
  user: { fullName: string | null; email: string };
  book: { title: string };
};

export type ChartPoint = {
  date: string;
  count: number;
};

export type DashboardData = {
  totalUsers: number;
  totalBooks: number;
  borrowRequests: number;
  latestUsers: UserPreview[];
  latestBorrow: BorrowEntry[];
  chartData: ChartPoint[];
};

export type FullBorrowRequest = {
  id: number;
  status: string;
  createdAt: string;
  borrowedAt: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    image: string | null;
  };
  book: {
    id: number;
    title: string;
  };
};
