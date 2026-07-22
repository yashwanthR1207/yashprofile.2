import { motion } from "framer-motion";
import Image from "next/image";

import ParticlesContainer from "../components/ParticlesContainer";
import Avatar from "../components/Avatar";

import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="bg-primary/60 h-full">
      {/* text */}
      <div className="w-full h-full">
        <div className="text-center flex flex-col justify-center pt-20 pb-28 sm:pt-24 sm:pb-28 md:pt-32 md:pb-32 xl:pt-40 xl:pb-0 xl:text-left h-full container mx-auto xl:items-end px-4 sm:px-6">
          <div className="flex flex-col items-center xl:items-start relative z-20">

          {/* Mobile avatar - visible only below xl */}
          <motion.div
            variants={fadeIn("down", 0.15)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="xl:hidden w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 relative"
          >
            <Image
              src="/avatar_new.png"
              alt="Yashwanth R"
              fill
              sizes="150px"
              className="object-cover object-top"
              priority
            />
          </motion.div>

          {/* title */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            Hello, I&apos;m <br />{" "}
            <span className="text-ink font-bold">
              Yashwanth <span className="text-accent">R</span>
            </span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-[90%] sm:max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-8 sm:mb-10 xl:mb-16 text-sm sm:text-base"
          >
            Building embedded systems and smart IoT solutions with bold design and real-world impact. Currently pursuing my B.E. at VVCE, Mysuru.
          </motion.p>

          </div>
        </div>
      </div>
      {/* image */}
      <div className="w-full max-w-[1280px] h-full absolute left-0 bottom-0 pointer-events-none overflow-hidden">
        {/* bg img */}
        <div
          role="img"
          className="bg-none xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute translate-z-0"
          aria-hidden
        />

        {/* particles */}
        <ParticlesContainer />

        {/* avatar - desktop only */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full max-w-[700px] max-h-[700px] absolute -bottom-24 md:-bottom-32 lg:bottom-0 lg:left-[8%]"
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
