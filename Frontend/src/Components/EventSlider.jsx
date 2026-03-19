import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function EventSlider() {
  const posters = [
    {
      img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
      title: "Live Concert Night",
      desc: "Feel the music like never before",
    },
    {
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      title: "DJ Party",
      desc: "Dance all night with top DJs",
    },
    {
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865",
      title: "Standup Comedy",
      desc: "Laugh out loud with top comedians",
    },
  ];

  return (
    <div className="px-6 md:px-8 pt-4 mb-20 relative">

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={25}
        slidesPerView={1.2}
        centeredSlides={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        loop={true}
      >

        {posters.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative rounded-2xl overflow-hidden group">

              {/* Image */}
              <img
                src={item.img}
                className="w-full h-[320px] object-cover transition duration-700 group-hover:scale-110"
                alt="event poster"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

              {/* Content */}
              <div className="absolute left-6 bottom-6 text-white max-w-md">

                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {item.title}
                </h2>

                <p className="text-sm opacity-80 mb-3">
                  {item.desc}
                </p>

                <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm">
                  Explore Now
                </button>

              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Arrow */}
      <button className="custom-prev absolute top-1/2 left-3 z-10 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/50 transition">
        <ChevronLeft size={22} />
      </button>

      {/* Right Arrow */}
      <button className="custom-next absolute top-1/2 right-3 z-10 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/50 transition">
        <ChevronRight size={22} />
      </button>

    </div>
  );
}