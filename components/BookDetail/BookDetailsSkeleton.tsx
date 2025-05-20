import React from 'react'

 const BookDetailsSkeleton = () => {
  return (
    <div className="min-h-screen  text-white px-8 py-12 animate-pulse">
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-3/5 space-y-6">
          <div className="h-10 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-600 rounded w-1/3"></div>
            <div className="h-4 bg-gray-600 rounded w-1/4"></div>
          </div>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-700 rounded"></div>
            ))}
            <div className="h-4 w-10 bg-gray-600 rounded"></div>
          </div>
          <div className="h-24 bg-gray-700 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-600 rounded mt-6"></div>
          <div className="h-24 bg-gray-700 rounded"></div>
          <div className="h-10 w-40 bg-blue-600 rounded mt-6"></div>
        </div>
        <div className="lg:w-2/5 h-96 bg-gray-800 rounded-lg"></div>
      </div>
    </div>
  </div>
  )
}
export default BookDetailsSkeleton;
