"use client";
import React, { useState } from "react";

// PDF viewer using Google Docs
const PublicPDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    pdfUrl
  )}&embedded=true`;

  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-[700px] border border-gray-300 rounded overflow-hidden">
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

export default PublicPDFViewer;
