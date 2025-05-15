import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white pt-6 pb-6 border-t border-gray-900 min-h-[100px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-3 min-h-[40px]"></div>

        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center min-h-[60px]">
          <Link href="/">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="/images/logo.svg"
                alt="Booky Logo"
                width={30}
                height={30}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-gray-300">Booky</span>
            </div>
          </Link>
          <p className="text-gray-400 mt-4 md:mt-0 text-sm md:text-base">
            &copy; {new Date().getFullYear()} Booky | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
