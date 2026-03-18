import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function EventSlider() {

  const posters = [
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    "https://images.unsplash.com/photo-1511578314322-379afb476865",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  ];

  return (
    <div className="px-8 pt-4 mb-30 relative z-10">

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1.4}        // 👈 1 full + half slide
        slidesOffsetBefore={0}   // 👈 slider right shift
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev"
        }}
        loop={true}
      >

        {posters.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              className="w-full h-[280px] object-cover rounded-xl"
              alt="event poster"
            />
          </SwiperSlide>
        ))}

      </Swiper>

      {/* Left Arrow */}
      <button className="custom-prev absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 cursor-pointer">
        <ChevronLeft size={24}/>
      </button>

      {/* Right Arrow */}
      <button className="custom-next absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 cursor-pointer">
        <ChevronRight size={24}/>
      </button>

    </div>
  );
}