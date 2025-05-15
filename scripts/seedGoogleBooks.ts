import { prisma } from "@/lib/prisma";

const randomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

async function seedBooksFromGoogle(query: string = "thriller", max = 10) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${max}&langRestrict=en`
  );
  const data = await res.json();

  const items = data.items ?? [];

  const booksToInsert = [];

  for (const item of items) {
    const info = item.volumeInfo;

    // فلترة غير الإنجليزية
    if (info.language !== "en") continue;

    const title = info.title?.trim();
    if (!title) continue;

    // تجاهل العناوين المكررة
    const existing = await prisma.book.findFirst({
      where: { title: title },
    });
    if (existing) continue;

    booksToInsert.push({
      title,
      author: info.authors?.[0] ?? "Unknown",
      category: info.categories?.[0] ?? "General",
      rating: Math.floor(Math.random() * 5 * 10) / 10,
      description: info.description ?? "No description available.",
      summary:
        info.description?.split(".").slice(0, 2).join(".") ?? "No summary.",
      image:
        info.imageLinks?.thumbnail?.replace("http://", "https://") ??
        "https://placehold.co/200x300",
      coverColor: randomColor(),
    });
  }

  if (booksToInsert.length === 0) {
    console.log("😕 No valid books found to insert.");
    return;
  }

  const created = await prisma.book.createMany({
    data: booksToInsert,
    skipDuplicates: true,
  });

  console.log(`✅ Seeded ${created.count} new English books.`);
}

seedBooksFromGoogle("fantasy", 15)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
