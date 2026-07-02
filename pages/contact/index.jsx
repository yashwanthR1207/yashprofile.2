import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

import { fadeIn } from "../../variants";

const Contact = () => {
  return (
    <div className="h-full bg-primary/30 flex items-center justify-center py-32 overflow-hidden">
      <div className="container mx-auto flex justify-center h-full items-center">
        
        {/* Business Card */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="bg-white rounded-[2rem] p-6 md:p-10 w-full max-w-[850px] shadow-[0_20px_50px_rgba(107,33,168,0.2)] flex flex-col md:flex-row items-stretch gap-x-10 relative z-10"
        >
          {/* Avatar Section */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-full md:w-[320px] h-[320px] md:h-auto relative rounded-3xl overflow-hidden shrink-0 border-4 border-white shadow-xl bg-gradient-to-b from-accent/20 to-transparent"
          >
            <Image 
              src="/avatar_new.png"
              alt="Yashwanth R"
              fill
              className="object-cover object-top"
            />
          </motion.div>

          {/* Info Section */}
          <div className="flex flex-col flex-1 mt-8 md:mt-0 justify-center">
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-black mb-2 font-sora">Yashwanth R</h2>
              <p className="text-accent text-lg font-bold mb-1">Electrical & Electronics Engineer</p>
              <p className="text-slate-500 font-semibold mb-6">IoT & Embedded Systems</p>
            </motion.div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-slate-200 mb-6" />

            {/* Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col gap-y-4"
            >
              <Link 
                href="mailto:yashwanth.1207.r@gmail.com" 
                className="flex items-center gap-x-6 bg-slate-100 hover:bg-[#EA4335] hover:text-white hover:shadow-lg hover:shadow-[#EA4335]/40 text-black px-6 py-4 rounded-2xl transition-all duration-300 group"
              >
                <FaEnvelope className="text-[#EA4335] group-hover:text-white text-2xl transition-colors duration-300" />
                <span className="font-bold text-[17px]">yashwanth.1207.r@gmail.com</span>
              </Link>
              
              <Link 
                href="https://www.linkedin.com/in/yashwanth-r-7855a7395" 
                target="_blank"
                className="flex items-center gap-x-6 bg-slate-100 hover:bg-[#0077b5] hover:text-white hover:shadow-lg hover:shadow-[#0077b5]/40 text-black px-6 py-4 rounded-2xl transition-all duration-300 group"
              >
                <FaLinkedin className="text-[#0077b5] group-hover:text-white text-2xl transition-colors duration-300" />
                <span className="font-bold text-[17px]">LinkedIn</span>
              </Link>

              <Link 
                href="https://github.com/yashwanthR1207" 
                target="_blank"
                className="flex items-center gap-x-6 bg-slate-100 hover:bg-[#181717] hover:text-white hover:shadow-lg hover:shadow-black/40 text-black px-6 py-4 rounded-2xl transition-all duration-300 group"
              >
                <FaGithub className="text-[#181717] group-hover:text-white text-2xl transition-colors duration-300" />
                <span className="font-bold text-[17px]">GitHub</span>
              </Link>
            </motion.div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-slate-200 my-6" />

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-accent font-extrabold text-center text-lg tracking-wide"
            >
              Available for Internships & Collaborations
            </motion.p>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
