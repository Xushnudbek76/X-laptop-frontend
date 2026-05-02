import { Box, Container, Typography } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import type { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";

const ActiveUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({ topUsers }));

export default function ActiveUsers() {
  const { topUsers } = useSelector(ActiveUsersRetriever);

  return (
    <Box sx={{ py: 8, background: "#f4f6f9" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#2563eb",
              letterSpacing: "2px",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Community
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#1a1a2e", letterSpacing: "0.5px" }}
          >
            Active Users
          </Typography>
        </Box>

        {topUsers.length !== 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "1fr 1fr",
                md: "repeat(4, 1fr)",
              },
              gap: { xs: 2.5, md: 3 },
            }}
          >
            {topUsers.map((member: Member) => {
              const image = member.memberImage
                ? `${serverApi}/${member.memberImage}`
                : "/images/default-avatar.png"; // fallback if no image

              return (
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
                  <Box
                    component="img"
                    src={image}
                    alt={member.memberNick}
                    sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "50%",
                      background:
                        "linear-gradient(to top, rgba(26,26,46,0.92) 0%, transparent 100%)",
                    }}
                  />

                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(37,99,235,0.15)",
                      opacity: 0,
                      transition: "opacity 0.25s ease",
                    }}
                  />

                  <Typography
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      left: 0,
                      right: 0,
                      textAlign: "center",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "1rem",
                      letterSpacing: "0.4px",
                      zIndex: 2,
                    }}
                  >
                    {member.memberNick}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", color: "#475569", py: 6 }}>No active users</Box>
        )}
      </Container>
    </Box>
  );
}
