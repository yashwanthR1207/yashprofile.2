import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#9ca3af] scrollbar-track-transparent p-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="relative group w-full h-[150px] sm:h-[180px] md:h-[220px] rounded-2xl cursor-pointer [perspective:1000px]"
          >
            {/* Card inner container */}
            <div
              className="w-full h-full relative transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] hover:-translate-y-2 rounded-2xl"
            >
              {/* Front State (iOS Smokey Glass) */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl overflow-hidden flex items-center justify-center bg-slate-400/10 backdrop-blur-2xl border border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] p-6 glare-effect">
                <h3 className="text-xl sm:text-2xl font-black font-sora text-black tracking-tighter text-center leading-tight">
                  {project.title}
                </h3>
              </div>

              {/* Back State (iOS Smokey Glass Flip Effect) */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-slate-200/80 backdrop-blur-2xl border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-4 glare-effect">
                <h3 className="text-lg md:text-xl font-extrabold text-black mb-4 font-sora text-center">
                  {project.title}
                </h3>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-glossy flex items-center justify-center gap-2 px-6 py-2.5 text-black font-bold text-sm transform hover:scale-105 active:scale-95 bg-white/50 border border-white/50 shadow-md"
                >
                  <BsGithub className="text-xl" />
                  <span>View Project</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {projects.length > 2 && (
        <p className="text-center text-sm font-medium text-slate-500 mt-3 animate-pulse">
          Scroll down for more projects &darr;
        </p>
      )}
    </div>
  );
};

export default WorkSlider;
