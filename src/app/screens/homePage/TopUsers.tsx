import React from "react";
import { Container, Stack, Box, Typography } from "@mui/material";

const hardcodedUsers = [
  { _id: "1", memberNick: "TechUser1", memberImage: "https://picsum.photos/seed/1/300" },
  { _id: "2", memberNick: "LaptopPro", memberImage: "https://picsum.photos/seed/2/300" },
  { _id: "3", memberNick: "GadgetFan", memberImage: "https://picsum.photos/seed/3/300" },
  { _id: "4", memberNick: "XUser4", memberImage: "https://picsum.photos/seed/4/300" },
];

export default function ActiveUsers() {
  return (
    <Box sx={{ py: 8, background: "#f4f6f9" }}>
      <Container maxWidth="lg">

        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography sx={{
            fontSize: "12px", fontWeight: 700, color: "#2563eb",
            letterSpacing: "2px", textTransform: "uppercase", mb: 1,
          }}>
            Community
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1a1a2e", letterSpacing: "0.5px" }}>
            Active Users
          </Typography>
        </Box>

        {/* Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",           // 1 column on mobile
              sm: "1fr 1fr",       // 2 columns on tablet
              md: "repeat(4, 1fr)", // 4 columns on desktop
            },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {hardcodedUsers.map((member) => (
            <Box
              key={member._id}
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "200px", sm: "260px", md: "300px" },
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(26,26,46,0.13)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 32px rgba(37,99,235,0.22)",
                },
                "&:hover .overlay": { opacity: 1 },
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={member.memberImage}
                alt={member.memberNick}
                sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />

              {/* Bottom gradient */}
              <Box sx={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                background: "linear-gradient(to top, rgba(26,26,46,0.92) 0%, transparent 100%)",
              }} />

              {/* Hover overlay */}
              <Box className="overlay" sx={{
                position: "absolute", inset: 0,
                background: "rgba(37,99,235,0.15)",
                opacity: 0, transition: "opacity 0.25s ease",
              }} />

              {/* Username */}
              <Typography sx={{
                position: "absolute", bottom: 16, left: 0, right: 0,
                textAlign: "center", color: "#ffffff", fontWeight: 700,
                fontSize: "1rem", letterSpacing: "0.4px", zIndex: 2,
              }}>
                {member.memberNick}
              </Typography>
            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  );
}