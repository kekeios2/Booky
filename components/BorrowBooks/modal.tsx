"use client";  // أضف هذا السطر في بداية الملف

import dynamic from "next/dynamic";
const PdfViewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }
);

interface ModalProps {
  isOpen: boolean;
  pdfUrl: string | null;
  closeModal: () => void;
}

const Modal = ({ isOpen, pdfUrl, closeModal }: ModalProps) => {
  if (!isOpen || !pdfUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg relative w-11/12 h-11/12 max-w-4xl">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 p-2 text-white bg-red-600 rounded-full"
        >
          X
        </button>
        <div className="w-full h-full">
          <PdfViewer fileUrl={pdfUrl} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
