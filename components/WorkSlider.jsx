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
      className="h-[240px] sm:h-[320px] md:h-[480px]"
    >
      {workSlides.slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
            {slide.images.map((image, imageI) => (
              <div
                className="relative rounded-lg overflow-hidden flex items-center justify-center group h-[100px] sm:h-[140px] md:h-[200px] bg-black/5 border border-black/10 hover:border-accent/50 transition-all duration-300"
                key={imageI}
              >
                {/* overlay gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-l from-transparent via-[#8b5cf6] to-[#4c1d95] opacity-0 group-hover:opacity-80 transition-all duration-700"
                  aria-hidden
                />

                {/* Title */}
                <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-center z-10 group-hover:text-ink group-hover:-translate-y-4 sm:group-hover:-translate-y-6 transition-all duration-300 px-4">
                  {image.title}
                </h3>

                {/* Link Text */}
                <div className="absolute bottom-0 translate-y-full group-hover:-translate-y-4 sm:group-hover:-translate-y-8 transition-all duration-300 z-10">
                  <Link
                    href={image.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-x-2 text-[10px] sm:text-[13px] tracking-[0.2em] uppercase group-hover:text-ink"
                  >
                    <div className="delay-100">VIEW</div>
                    <div className="translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                      PROJECT
                    </div>
                    <div className="text-sm sm:text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                      <BsArrowRight aria-hidden />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WorkSlider;
