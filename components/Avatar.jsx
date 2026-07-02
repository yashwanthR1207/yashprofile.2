import Image from "next/image";

import { motion } from "framer-motion";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none pointer-events-none select-none relative w-full h-full justify-center items-end">
      {/* Pop-up Image */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="w-full h-full relative z-10"
      >
        <Image
          src="/avatar_new.png"
          alt="avatar"
          fill
          sizes="(max-width: 1200px) 100vw, 50vw"
          className="translate-z-0 object-contain object-bottom"
        />
      </motion.div>
    </div>
  );
};

export default Avatar;
