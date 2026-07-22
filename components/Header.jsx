import Image from "next/image";
import Link from "next/link";

import Socials from "../components/Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full items-center px-4 sm:px-6 md:px-16 xl:px-0 xl:h-[90px]"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center gap-y-4 py-4 sm:py-6 lg:py-8">
          <Link href="/">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider whitespace-nowrap">
              yashwanth <span className="text-accent">R.</span>
            </h1>
          </Link>

          {/* socials */}
          <Socials />
        </div>
      </div>
    </header>
  );
};

export default Header;
