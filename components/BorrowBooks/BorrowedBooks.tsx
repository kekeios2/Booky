"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Book } from "@/types/types";
import useFetchBooks from "@/hooks/FetchingBorrow";
import BookList from "@/components/BorrowBooks/BookList";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Dynamic import of PDFViewer components to avoid SSR issues
const SimplePDFViewer = dynamic(
  () => import("@/components/BorrowBooks/MyPDFViewer"),
  {
    ssr: false,
    loading: () => <p className="text-center my-4">Initializing viewer...</p>,
  }
);

const BorrowedBooks = () => {
  const { books, loading, error } = useFetchBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to track which PDF viewer to use
  const [viewerType, setViewerType] = useState<"simple" | "basic">("simple");
  const [viewerError, setViewerError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    const navbar = document.getElementById("app-navbar");
    if (!navbar) return;

    if (isModalOpen) {
      navbar.style.display = "none";
    } else {
      navbar.style.display = "";
    }

    return () => {
      if (navbar) navbar.style.display = "";
    };
  }, [isModalOpen]);

  useEffect(() => {
    // Check if there's an openBook parameter in the URL
    const openBookId = searchParams.get("openBook");
    if (openBookId && books.length > 0) {
      // Find the book with the matching ID
      const bookToOpen = books.find((book) => book.id === parseInt(openBookId));
      if (bookToOpen) {
        openModal(bookToOpen);
      }
    }
  }, [books, searchParams]);

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
    setViewerType("simple"); // Default to simple viewer
    setViewerError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);

    // Remove the openBook parameter from the URL
    const url = new URL(window.location.href);
    url.searchParams.delete("openBook");
    window.history.replaceState({}, "", url.toString());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading borrowed books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16 justify-items-center rounded-lg">
        <Image
          width={200}
          height={200}
          alt="noBooks"
          src={"https://ik.imagekit.io/xt6hfeibgz/Ui-Images/Mask.png"}
        ></Image>
        <h3 className="text-2xl text-gray-400 font-semibold my-4">
          Nothing to Read?
        </h3>
        <p className="text-gray-500">Your shelf is empty, your soul is bored</p>
        <p className="text-gray-500">Fix both — go borrow a book.</p>
      </div>
    );
  }

  return (
    <div>
      <BookList books={books} openModal={openModal} />

      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[1000] p-4 ">
          <div className="bg-white rounded-lg relative w-full max-w-4xl max-h-[90vh] flex flex-col my-8">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-[1010]">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {selectedBook.title}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-1.5"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {viewerError && (
              <div className="px-4 py-2 bg-yellow-50 border-b border-yellow-200">
                <p className="text-sm text-yellow-700">{viewerError}</p>
              </div>
            )}

            <div className="p-4 flex-1 overflow-auto">
              {selectedBook.pdfUrl ? (
                <>
                  <SimplePDFViewer pdfUrl={selectedBook.pdfUrl} />
                </>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500">
                    No PDF available for this book
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
