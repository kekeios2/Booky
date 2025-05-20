// app/books/[id]/page.tsx
import BookDetailPage from "@/components/BookDetail/BookDetailPage";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function BookPage({ params }: { params: { id: string } }) {
  const bookRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/books/${params.id}`, {
    next: { revalidate: 60 },
  });
  if (!bookRes.ok) return notFound();
  const { book } = await bookRes.json();

  const recRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/recommendion?id=${params.id}`, {
    next: { revalidate: 60 },
  });
  const { recommendations } = recRes.ok ? await recRes.json() : { recommendations: [] };

  return <BookDetailPage book={book} recommendedBooks={recommendations} />;
}
