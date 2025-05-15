import React from 'react'

const HeroSkeleton = () => {
  return (
    <section className="bg-transparent pb-8 md:pb-12 lg:pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-16 animate-pulse min-h-[600px]">
          {/* الغلاف */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-start h-[28rem]">
            <div className="w-48 md:w-85 h-full bg-gray-700 rounded shadow-2xl"></div>
          </div>

          {/* محتوى الكتاب */}
          <div className="w-full lg:w-3/5 space-y-4 text-center lg:text-left">
            <div className="h-10 w-3/4 bg-gray-600 rounded mx-auto lg:mx-0"></div>
            <div className="h-4 w-1/2 bg-gray-500 rounded mx-auto lg:mx-0"></div>

            <div className="flex justify-center lg:justify-start gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-500 rounded"></div>
              ))}
            </div>

            <div className="h-20 bg-gray-700 rounded w-full mx-auto lg:mx-0"></div>

            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="h-4 w-20 bg-gray-500 mb-2 rounded"></div>
              <div className="h-16 w-full bg-gray-600 rounded"></div>
            </div>

            <div className="w-48 h-12 bg-gray-700 rounded-lg mt-4 mx-auto lg:mx-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
