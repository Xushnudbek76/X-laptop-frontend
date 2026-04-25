import { Box, Container, Stack, Typography, Avatar, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Settings } from "./Settings";
import { useNavigate } from "react-router-dom";
import { useGlobals } from "../../components/hooks/useGlobals";
import { serverApi } from "../../../lib/config";

export default function UserPage() {
  const navigate = useNavigate();
  const { authMember } = useGlobals();

  if (!authMember) {
    navigate("/");
    return null;
  }

  const socialIcons = [
    { icon: <FacebookIcon sx={{ fontSize: 18 }} />, color: "#1877f2" },
    { icon: <InstagramIcon sx={{ fontSize: 18 }} />, color: "#e1306c" },
    { icon: <TelegramIcon sx={{ fontSize: 18 }} />, color: "#2ca5e0" },
    { icon: <YouTubeIcon sx={{ fontSize: 18 }} />, color: "#ff0000" },
  ];

  return (
    <Box sx={{ bgcolor: "#0a0f1e", minHeight: "100vh", pb: 8 }}>
      {/* Header */}
      <Box sx={{
        bgcolor: "#111827", borderBottom: "1px solid rgba(255,255,255,0.06)",
        px: { xs: 2, md: 4 }, py: 2.5,
        display: "flex", alignItems: "center", gap: 1.5,
      }}>
        <PersonOutlineIcon sx={{ color: "#2563eb", fontSize: 22 }} />
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#e8eaf0" }}>
          My Profile
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="flex-start">

          {/* ── LEFT: Edit Form ── */}
          <Box sx={{
            flex: 1, minWidth: 0,
            bgcolor: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            p: { xs: 2.5, md: 3.5 },
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <EditNoteIcon sx={{ color: "#3b82f6", fontSize: 22 }} />
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#e8eaf0" }}>
                Edit Profile
              </Typography>
            </Box>
            <Settings />
          </Box>

          {/* ── RIGHT: Profile Card ── */}
          <Box sx={{
            width: { xs: "100%", md: 280 },
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
            {/* Profile Card */}
            <Box sx={{
              bgcolor: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              overflow: "hidden",
            }}>
              {/* Banner */}
              <Box sx={{ height: 70, background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)" }} />

              {/* Avatar */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: "-35px", mb: 1.5 }}>
                {authMember.memberImage ? (
                  <Avatar
                    src={`${serverApi}/${authMember.memberImage}`}
                    sx={{ width: 70, height: 70, border: "3px solid #1a1a2e", boxShadow: "0 4px 14px rgba(0,0,0,0.4)" }}
                  />
                ) : (
                  <Box sx={{
                    width: 70, height: 70, borderRadius: "50%",
                    bgcolor: "rgba(37,99,235,0.2)", border: "3px solid #1a1a2e",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                  }}>
                    <PersonOutlineIcon sx={{ color: "#60a5fa", fontSize: 32 }} />
                  </Box>
                )}
              </Box>

              <Box sx={{ textAlign: "center", pb: 3, px: 2.5 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#e8eaf0" }}>
                  {authMember.memberNick}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#3b82f6", fontWeight: 600, mb: 2 }}>
                  {authMember.memberType}
                </Typography>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2 }} />

                {/* Info rows */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, mb: 2 }}>
                  {authMember.memberPhone && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
                      <PhoneIcon sx={{ fontSize: 14, color: "#2563eb" }} />
                      <Typography sx={{ fontSize: 13, color: "#8892a4" }}>
                        {authMember.memberPhone}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
                    <LocationOnOutlinedIcon sx={{ fontSize: 14, color: "#2563eb" }} />
                    <Typography sx={{ fontSize: 13, color: "#8892a4" }}>
                      {authMember.memberAddress ?? "No address"}
                    </Typography>
                  </Box>
                </Box>

                {authMember.memberDesc && (
                  <>
                    <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2 }} />
                    <Typography sx={{ fontSize: 13, color: "#8892a4", lineHeight: 1.6, textAlign: "left" }}>
                      {authMember.memberDesc}
                    </Typography>
                  </>
                )}

                {/* Social Icons */}
                <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5 }}>
                  {socialIcons.map((s, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 34, height: 34, borderRadius: "9px",
                        bgcolor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", color: "#8892a4",
                        transition: "all 0.2s",
                        "&:hover": { color: s.color, borderColor: s.color, bgcolor: `${s.color}15` },
                      }}
                    >
                      {s.icon}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Points Card */}
            <Box sx={{
              bgcolor: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              p: 2.5,
            }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#e8eaf0", mb: 1.5 }}>
                Member Points
              </Typography>
              <Box sx={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                bgcolor: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)",
                borderRadius: "12px", px: 2, py: 1.5,
              }}>
                <Typography sx={{ fontSize: 13, color: "#8892a4" }}>Available Points</Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 800, color: "#3b82f6" }}>
                  {authMember.memberPoints.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}