import { useRef } from "react";
import { Typography, Chip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { plans } from "../../../lib/data";
import "swiper/css";
import "swiper/css/pagination";

export default function News() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="events">
      <div className="home-section__container">
        <div className="home-section__header">
          <Typography className="home-section__kicker">Don&apos;t Miss Out</Typography>
          <Typography className="home-section__title">Upcoming Events</Typography>
        </div>

        <div className="events__slider-shell">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            pagination={{ el: ".events__pagination", clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="events__swiper"
          >
            {plans.map((value, index) => (
              <SwiperSlide key={index}>
                <div className="events__slide">
                  <div className="events__image-wrap">
                    <img src={value.img} alt={value.title} className="events__image" />
                    <div className="events__image-gradient" />
                  </div>

                  <div className="events__content">
                    <div>
                      <Typography className="events__title">{value.title}</Typography>

                      <div className="events__author">
                        <div className="events__author-badge">{value.author?.[0]}</div>
                        <Typography className="events__author-name">{value.author}</Typography>
                      </div>

                      <Typography className="events__description">{value.desc}</Typography>
                    </div>

                    <div className="events__chips">
                      <Chip label={value.date} size="small" className="events__chip" />
                      <Chip label={value.location} size="small" className="events__chip" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="events__nav">
          <div className="events__arrow" onClick={() => swiperRef.current?.slidePrev()}>
            ‹
          </div>
          <div className="events__pagination" />
          <div className="events__arrow" onClick={() => swiperRef.current?.slideNext()}>
            ›
          </div>
        </div>
      </div>
    </section>
  );
}
