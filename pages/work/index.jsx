import { motion } from "framer-motion";
import Image from "next/image";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import WorkSlider from "../../components/WorkSlider";
import { fadeIn } from "../../variants";

const Work = () => {
  return (
    <div className="h-full bg-primary/30 pt-24 pb-32 md:py-36 flex items-center relative overflow-y-auto overflow-x-hidden xl:overflow-hidden">
      <Circles />
      {/* Corner Profile Cat */}
      <motion.div
        initial={{ y: 150, scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          delay: 0.8,
        }}
        className="absolute -bottom-4 -left-4 md:bottom-10 md:left-10 w-[100px] h-[100px] md:w-[220px] md:h-[220px] rounded-full border-4 border-accent/50 bg-accent/10 overflow-hidden shadow-2xl z-20"
      >
        <Image 
          src="/work-cat.png"
          alt="Cat working"
          fill
          className="object-cover"
        />
      </motion.div>
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* text */}
          <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0">
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-12"
            >
              My work <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0"
            >
              Innovating through practical hardware solutions and intelligent software design.
            </motion.p>
          </div>

          {/* slider */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
          >
            <WorkSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Work;
