import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const workSlides = {
  slides: [
    {
      images: [
        {
          title: "IoT Plant Detection",
          link: "https://github.com/yashwanthR1207/AIOT-plant-detection-",
        },
        {
          title: "Godown Automation",
          link: "https://github.com/yashwanthR1207/IoT-Based-Intelligent-Godown-Automation-and-Safety-System",
        },
        {
          title: "Robo Soccer",
          link: "https://github.com/yashwanthR1207/Robo-soccer-Version-2",
        },
        {
          title: "RC Car",
          link: "https://github.com/yashwanthR1207/RC-car-version1",
        },
      ],
    },
  ],
};

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="h-[280px] sm:h-[320px] md:h-[480px]"
    >
      {workSlides.slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 h-full">
            {slide.images.map((image, imageI) => (
              <Link
                href={image.link}
                target="_blank"
                rel="noreferrer noopener"
                className="relative rounded-lg overflow-hidden flex items-center justify-center group h-[120px] sm:h-[140px] md:h-[200px] bg-black/5 border border-black/10 hover:border-accent/50 active:border-accent/50 transition-all duration-300 cursor-pointer"
                key={imageI}
              >
                {/* overlay gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-l from-transparent via-[#8b5cf6] to-[#4c1d95] opacity-0 group-hover:opacity-80 transition-all duration-700"
                  aria-hidden
                />

                {/* Title */}
                <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-center z-10 group-hover:text-white transition-all duration-300 px-3 sm:px-4">
                  {image.title}
                </h3>

                {/* Arrow indicator */}
                <div className="absolute bottom-2 right-3 sm:bottom-3 sm:right-4 z-10 text-accent/40 group-hover:text-white transition-all duration-300">
                  <BsArrowRight className="text-base sm:text-lg" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WorkSlider;
