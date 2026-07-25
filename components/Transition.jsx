import { motion } from "framer-motion";

const Transition = () => {
  const transitionVariants = {
    initial: {
      x: "100%",
      width: "100%",
    },
    animate: {
      x: "0%",
      width: "0%",
    },
    exit: {
      x: ["0%", "100%"],
      width: ["0%", "100%"],
    },
  };

  return (
    <>
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-[#9ca3af]/40 backdrop-blur-md border-r border-white/30 shadow-2xl"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-[#d1d5db]/50 backdrop-blur-md border-r border-white/40 shadow-xl"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-[#f3f4f6]/60 backdrop-blur-md border-r border-white/50 shadow-lg"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.6, duration: 0.6, ease: "easeInOut" }}
        aria-hidden
      />
    </>
  );
};

export default Transition;
