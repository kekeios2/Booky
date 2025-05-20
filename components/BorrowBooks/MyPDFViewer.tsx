"use client";
import React from "react";

const SimplePDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  // Using Google Docs viewer for better compatibility
  const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    pdfUrl
  )}&embedded=true`;

  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-[600px] border border-gray-300 rounded overflow-hidden">
        <iframe
          src={googleDocsUrl}
          className="w-full h-full"
          title="PDF Viewer"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default SimplePDFViewer;