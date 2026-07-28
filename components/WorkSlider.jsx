import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

// swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const WorkSlider = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="h-[280px] sm:h-[320px] md:h-[480px] flex items-center justify-center text-black/50">Loading projects...</div>;
  }

  if (projects.length === 0) {
    return <div className="h-[280px] sm:h-[320px] md:h-[480px] flex items-center justify-center text-black/50">No projects found.</div>;
  }

  return (
    <div className="flex flex-col h-full min-h-[400px] w-full items-center justify-center">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 150,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="w-full !pb-16"
      >
        {projects.map((project, i) => (
          <SwiperSlide key={project.id} className="w-[280px] sm:w-[350px] md:w-[450px] h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="relative group w-full h-full rounded-2xl cursor-pointer [perspective:1000px]"
            >
              {/* Card inner container */}
              <div
                className="w-full h-full relative transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] hover:-translate-y-2 rounded-2xl"
              >
                {/* Front State (iOS Smokey Glass) */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden flex items-center justify-center bg-slate-400/10 backdrop-blur-2xl border border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] p-6 glare-effect">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-sora text-black tracking-tighter text-center leading-tight drop-shadow-sm">
                    {project.title}
                  </h3>
                </div>

                {/* Back State (iOS Smokey Glass Flip Effect) */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-slate-200/80 backdrop-blur-2xl border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-4 glare-effect">
                  <h3 className="text-xl md:text-2xl font-extrabold text-black mb-6 font-sora text-center">
                    {project.title}
                  </h3>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-glossy flex items-center justify-center gap-2 px-6 sm:px-8 py-3 text-black font-bold text-sm sm:text-base transform hover:scale-105 active:scale-95 bg-white/50 border border-white/50 shadow-md"
                  >
                    <BsGithub className="text-xl sm:text-2xl" />
                    <span>View Project</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WorkSlider;
