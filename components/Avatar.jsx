import Image from "next/image";

import { motion } from "framer-motion";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none pointer-events-none select-none relative w-full h-full justify-center items-end">
      {/* Pulsing Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[60%] h-[60%] bg-accent/40 blur-[80px] rounded-full bottom-10 z-0"
      />
      
      {/* Floating Image */}
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full h-full relative z-10"
      >
        <Image
          src="/avatar_new.png"
          alt="avatar"
          fill
          sizes="(max-width: 1200px) 100vw, 50vw"
          className="translate-z-0 object-contain object-bottom drop-shadow-[0_0_15px_rgba(107,33,168,0.5)]"
        />
      </motion.div>
    </div>
  );
};

export default Avatar;
