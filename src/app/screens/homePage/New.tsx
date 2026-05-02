import { useRef } from "react";
import { Box, Stack, Typography, Chip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { plans } from "../../../lib/data";
import "swiper/css";
import "swiper/css/pagination";

export default function News() {
  const swiperRef = useRef(null);

  return (
    <Box sx={{ py: 8, background: "#0f172a" }}>
      <Stack sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#3b82f6",
              letterSpacing: "3px",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Don't Miss Out
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#ffffff" }}>
            Upcoming Events
          </Typography>
        </Box>

        {/* Swiper wrapper — clips overflowing slides */}
        <Box sx={{ overflow: "hidden", borderRadius: "20px" }}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            pagination={{ el: ".custom-pagination", clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            style={{ width: "100%" }}
          >
            {plans.map((value, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "280px", md: "320px" },
                      minWidth: { xs: "unset", sm: "280px", md: "320px" },
                      height: { xs: "200px", sm: "280px" },
                      position: "relative",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src={value.img}
                      alt={value.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.5s ease",
                        "&:hover": { transform: "scale(1.07)" },
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: {
                          xs: "linear-gradient(to bottom, transparent 60%, #1e293b 100%)",
                          sm: "linear-gradient(to right, transparent 50%, #1e293b 100%)",
                        },
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box
                    sx={{
                      flex: 1,
                      p: { xs: 2.5, sm: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#ffffff",
                          fontWeight: 800,
                          mb: 1.5,
                          fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                        }}
                      >
                        {value.title}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            color: "#fff",
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {value.author?.[0]}
                        </Box>
                        <Typography sx={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                          {value.author}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          color: "#cbd5e1",
                          lineHeight: 1.7,
                          fontSize: { xs: "0.82rem", sm: "0.9rem" },
                          display: "-webkit-box",
                          WebkitLineClamp: { xs: 3, sm: 4 },
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {value.desc}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap" }}>
                      <Chip
                        label={value.date}
                        size="small"
                        sx={{
                          background: "rgba(59,130,246,0.15)",
                          color: "#93c5fd",
                          border: "1px solid rgba(59,130,246,0.35)",
                          fontWeight: 600,
                          fontSize: { xs: "0.72rem", sm: "0.8rem" },
                        }}
                      />
                      <Chip
                        label={value.location}
                        size="small"
                        sx={{
                          background: "rgba(59,130,246,0.15)",
                          color: "#93c5fd",
                          border: "1px solid rgba(59,130,246,0.35)",
                          fontWeight: 600,
                          fontSize: { xs: "0.72rem", sm: "0.8rem" },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Navigation Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            mt: 4,
          }}
        >
          <Box
            onClick={() => swiperRef.current?.slidePrev()}
            sx={{
              width: { xs: 38, sm: 44 },
              height: { xs: 38, sm: 44 },
              borderRadius: "50%",
              background: "rgba(59,130,246,0.1)",
              border: "1.5px solid rgba(59,130,246,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#93c5fd",
              fontSize: { xs: "18px", sm: "22px" },
              transition: "all 0.2s ease",
              userSelect: "none",
              "&:hover": {
                background: "rgba(59,130,246,0.25)",
                borderColor: "#3b82f6",
                transform: "scale(1.1)",
              },
            }}
          >
            ‹
          </Box>

          <Box className="custom-pagination" sx={{ display: "flex", gap: 1 }} />

          <Box
            onClick={() => swiperRef.current?.slideNext()}
            sx={{
              width: { xs: 38, sm: 44 },
              height: { xs: 38, sm: 44 },
              borderRadius: "50%",
              background: "rgba(59,130,246,0.1)",
              border: "1.5px solid rgba(59,130,246,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#93c5fd",
              fontSize: { xs: "18px", sm: "22px" },
              transition: "all 0.2s ease",
              userSelect: "none",
              "&:hover": {
                background: "rgba(59,130,246,0.25)",
                borderColor: "#3b82f6",
                transform: "scale(1.1)",
              },
            }}
          >
            ›
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
