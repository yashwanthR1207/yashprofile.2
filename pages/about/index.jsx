import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CountUp from "react-countup";

import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

const About = () => {
  const [index, setIndex] = useState(0);
  const [aboutData, setAboutData] = useState({ stats: {}, skills: [], credentials: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch("/api/about");
        if (res.ok) {
          const data = await res.json();
          setAboutData(data);
        }
      } catch (err) {
        console.error("Failed to fetch about data", err);
      }
      setLoading(false);
    };
    fetchAboutData();
  }, []);

  const currentTabs = [
    { title: "skills", info: aboutData.skills },
    { title: "credentials", info: aboutData.credentials }
  ];

  if (loading) {
    return <div className="h-full bg-primary/30 flex items-center justify-center text-black/50">Loading...</div>;
  }

  return (
    <div className="h-full bg-primary/30 py-20 text-center xl:text-left mobile-scroll-page">
      <Circles />

      {/* avatar img */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[370px]"
      >
        <Avatar />
      </motion.div>

      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6 px-4 sm:px-6">
        {/* text */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            Solving real problems with <span className="text-accent">smart systems.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 text-sm sm:text-base"
          >
            I have a product-first mindset, focusing on building systems that solve real problems. I am actively involved in robotics and student leadership, and I am always exploring new challenges. My work centers on turning hardware ideas into complete working systems using embedded C, ESP32, Arduino, and more.
          </motion.p>

          {/* counters */}
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            className="flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-md sm:max-w-none mx-auto xl:mx-0">
              {/* cgpa */}
              <div className="relative flex flex-col items-center sm:items-start p-3 sm:p-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={aboutData.stats.cgpa || 0} duration={5} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  CGPA
                </div>
              </div>

              {/* projects */}
              <div className="relative flex flex-col items-center sm:items-start p-3 sm:p-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={aboutData.stats.projects || 0} duration={5} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Projects
                </div>
              </div>

              {/* certifications */}
              <div className="relative flex flex-col items-center sm:items-start p-3 sm:p-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={aboutData.stats.certifications || 0} duration={5} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Certifications
                </div>
              </div>

              {/* dedication */}
              <div className="relative flex flex-col items-center sm:items-start p-3 sm:p-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={aboutData.stats.dedication || 0} duration={5} />%
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Dedication
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* info */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] h-auto md:h-[480px]"
        >
          <div className="flex flex-wrap justify-center xl:justify-start gap-x-4 gap-y-3 xl:gap-x-6 mx-auto xl:mx-0 mb-6">
            {currentTabs.map((item, itemI) => (
              <div
                key={itemI}
                className={`tab-glossy cursor-pointer capitalize text-base sm:text-lg ${
                  index === itemI ? "active font-bold" : "font-medium"
                }`}
                onClick={() => setIndex(itemI)}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
            {currentTabs[index].info.map((item, itemI) => (
              <div
                key={itemI}
                className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-center text-muted"
              >
                {/* title */}
                <div className="font-light mb-1 md:mb-0 text-sm sm:text-base">{item.title}</div>
                <div className="hidden md:flex">-</div>
                <div className="text-sm sm:text-base">{item.stage}</div>

                <div className="flex gap-x-4">
                  {/* icons */}
                  {item.icons?.map((Icon, iconI) => (
                    <div key={iconI} className="text-2xl text-ink">
                      <Icon />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
