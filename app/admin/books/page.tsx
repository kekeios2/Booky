import { BookTable } from "@/components/admin/bookTable";
import CreateBook from "@/components/admin/CreateBook";

const BooksPage = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Books Management</h1>
        <div className="space-x-2">
        <CreateBook />
        </div>
      </div>
      <BookTable />
    </section>
  );
};

export default BooksPage;