import { motion } from "framer-motion";

import Circles from "../../components/Circles";
import WorkSlider from "../../components/WorkSlider";
import { fadeIn } from "../../variants";

const Work = () => {
  return (
    <div className="h-full bg-primary/30 pt-24 sm:pt-32 pb-12 flex flex-col relative mobile-scroll-page overflow-hidden">
      <Circles />
      <div className="container mx-auto px-4 sm:px-6 flex-1 flex flex-col xl:flex-row gap-x-8 h-full">
        {/* text */}
        <div className="text-center flex flex-col xl:w-[30vw] lg:text-left mb-6 xl:mb-0 shrink-0 justify-center xl:justify-start xl:pt-16">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            My work <span className="text-accent">.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-[400px] mx-auto lg:mx-0 text-sm sm:text-base"
          >
            Innovating through practical hardware solutions and intelligent software design.
          </motion.p>
        </div>

        {/* grid */}
        <motion.div
          variants={fadeIn("down", 0.6)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full xl:max-w-[65%] flex-1 flex flex-col h-full min-h-[400px]"
        >
          <WorkSlider />
        </motion.div>
      </div>
    </div>
  );
};

export default Work;
