// src/app/components/header/HomeNavbar.tsx
import { useState } from "react";
import {
  AppBar, Toolbar, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  Divider, Avatar, Container, Stack, Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Laptops", path: "/laptops" },
  { label: "Help", path: "/help" },
];

const authNavLinks = [
  { label: "Orders", path: "/orders" },
  { label: "My Page", path: "/member-page" },
];

export default function HomeNavbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const authMember = null; // replace with: useSelector((state: RootState) => state.yourSlice.authMember)

  const allLinks = authMember ? [...navLinks, ...authNavLinks] : navLinks;

  return (
    <Box className="home-navbar" sx={{ bgcolor: "#f5f6f8", minHeight: "100vh" }}>

      {/* ── NAVBAR ── */}
      <AppBar position="fixed" elevation={0} sx={{
        bgcolor: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <Toolbar sx={{ px: "0 !important", minHeight: "64px !important" }}>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center" }}>

            {/* Logo */}
            <Box
              onClick={() => navigate("/")}
              sx={{
                fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
                fontSize: 16, letterSpacing: 2, color: "#fff", cursor: "pointer",
              }}
            >
              <Box component="span" sx={{ color: "#3b82f6" }}>X-</Box>LAPTOP
            </Box>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, ml: 4 }}>
              {allLinks.map(({ label, path }) => (
                <Button key={label} onClick={() => navigate(path)}
                  sx={{
                    fontSize: 14, fontWeight: 400, color: "#94a3b8",
                    textTransform: "none", px: 2, borderRadius: 2, minWidth: "auto",
                    "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.06)" },
                  }}>
                  {label}
                </Button>
              ))}
            </Box>

            {/* Desktop Right */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, ml: "auto", alignItems: "center" }}>
              {!authMember ? (
                <>
                  <Button onClick={() => navigate("/signup")}
                    sx={{
                      fontSize: 14, color: "#e8eaf0", textTransform: "none",
                      px: 2.5, borderRadius: 2, border: "1px solid rgba(255,255,255,0.15)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                    }}>
                    Sign Up
                  </Button>
                  <Button variant="contained" onClick={() => navigate("/login")}
                    sx={{
                      fontSize: 14, fontWeight: 500, textTransform: "none",
                      px: 2.5, borderRadius: 2, bgcolor: "#3b82f6",
                      "&:hover": { bgcolor: "#2563eb" },
                    }}>
                    Login
                  </Button>
                </>
              ) : (
                <Avatar
                  src={authMember?.memberImage ?? "/icons/default-user.svg"}
                  alt="profile"
                  onClick={() => navigate("/member-page")}
                  sx={{
                    width: 38, height: 38, cursor: "pointer",
                    border: "2px solid rgba(59,130,246,0.5)",
                    "&:hover": { border: "2px solid #3b82f6" },
                  }}
                />
              )}
            </Box>

            {/* Mobile Hamburger */}
            <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
              <IconButton onClick={() => setDrawerOpen(true)}
                sx={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, p: 0.75 }}>
                <MenuIcon sx={{ fontSize: 20, color: "#94a3b8" }} />
              </IconButton>
            </Box>

          </Container>
        </Toolbar>
      </AppBar>

      {/* ── HERO ── */}
      <Container maxWidth="lg">
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "center",
          gap: { xs: 5, md: 8 },
          minHeight: "100vh",
          pt: { xs: "80px", md: 0 },
          py: { xs: 10, md: 0 },
        }}>

          {/* LEFT — Text */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography sx={{
              fontSize: 11, fontWeight: 600, letterSpacing: 3,
              color: "#2563eb", textTransform: "uppercase", mb: 2.5,
            }}>
              The Digital Architect Series
            </Typography>

            <Typography sx={{
              fontSize: { xs: 52, md: 72, lg: 88 },
              fontWeight: 900, lineHeight: 1, color: "#0a0a0f",
            }}>
              X-LAPTOP
            </Typography>

            <Typography sx={{
              fontSize: { xs: 52, md: 72, lg: 88 },
              fontWeight: 900, lineHeight: 1, color: "#d1d5db", mb: 3.5,
            }}>
              Precision.
            </Typography>

            <Typography sx={{
              fontSize: 16, color: "#64748b", lineHeight: 1.7,
              maxWidth: 380, mb: 5,
              mx: { xs: "auto", md: 0 },
            }}>
              Engineered from aerospace-grade titanium. Crafted for those who
              define the future. Unrivaled performance meets editorial elegance.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                fontSize: 15, fontWeight: 500, textTransform: "none",
                px: 3.5, py: 1.5, borderRadius: 2,
                bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" },
              }}
            >
              Sign Up →
            </Button>

            {/* Stats */}
            <Stack
              direction="row"
              sx={{ mt: 6.5, justifyContent: { xs: "center", md: "flex-start" } }}
            >
              {[
                { num: "4.8GHz", label: "Peak Clock" },
                { num: "22hrs", label: "Uptime" },
                { num: "1.2kg", label: "Total Mass" },
              ].map(({ num, label }, i) => (
                <Box key={label} sx={{
                  pr: i < 2 ? 4 : 0,
                  mr: i < 2 ? 4 : 0,
                  borderRight: i < 2 ? "1px solid #e2e8f0" : "none",
                }}>
                  <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#0a0a0f" }}>
                    {num}
                  </Typography>
                  <Typography sx={{
                    fontSize: 10, fontWeight: 600, letterSpacing: 1.5,
                    color: "#94a3b8", textTransform: "uppercase", mt: 0.25,
                  }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* RIGHT — Laptop Visual */}
          <Box sx={{
            bgcolor: "#1a1a2e", borderRadius: 5,
            aspectRatio: { xs: "4/3", md: "1" },
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", position: "relative",
          }}>
            {/* Glow */}
            <Box sx={{
              position: "absolute", width: "60%", height: "40%",
              bgcolor: "rgba(100,100,120,0.25)", borderRadius: "50%",
              top: "20%", left: "20%", filter: "blur(30px)",
            }} />
            {/* Laptop SVG */}
            <Box
              component="svg"
              viewBox="0 0 400 280"
              sx={{ width: "80%", position: "relative", zIndex: 1 }}
            >
              <rect x="40" y="20" width="320" height="210" rx="12" fill="#2a2a2a" stroke="#444" strokeWidth="2"/>
              <rect x="52" y="32" width="296" height="186" rx="4" fill="#050508"/>
              <defs>
                <radialGradient id="sg" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#2a2a3a" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#050508"/>
                </radialGradient>
              </defs>
              <rect x="52" y="32" width="296" height="186" rx="4" fill="url(#sg)"/>
              <ellipse cx="200" cy="28" rx="4" ry="4" fill="#333"/>
              <rect x="10" y="232" width="380" height="18" rx="6" fill="#3a3a3a" stroke="#555" strokeWidth="1.5"/>
              <rect x="150" y="233" width="100" height="8" rx="4" fill="#2a2a2a"/>
            </Box>
          </Box>

        </Box>
      </Container>

      {/* ── MOBILE DRAWER ── */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, pt: 1, bgcolor: "#0f1117", borderLeft: "1px solid rgba(255,255,255,0.08)" } }}>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pb: 1 }}>
          {authMember ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                src={authMember?.memberImage ?? "/icons/default-user.svg"}
                sx={{ width: 32, height: 32, border: "2px solid rgba(59,130,246,0.5)" }}
              />
              <Box sx={{ fontSize: 13, color: "#e8eaf0" }}>{authMember?.memberNick ?? "Member"}</Box>
            </Box>
          ) : <Box />}
          <IconButton onClick={() => setDrawerOpen(false)} size="small">
            <CloseIcon sx={{ fontSize: 20, color: "#94a3b8" }} />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <List dense>
          {allLinks.map(({ label, path }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton onClick={() => { navigate(path); setDrawerOpen(false); }}
                sx={{ px: 2.5, py: 1.25, "&:hover": { bgcolor: "rgba(255,255,255,0.05)" } }}>
                <ListItemText primary={label}
                  primaryTypographyProps={{ fontSize: 14, color: "#94a3b8" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {!authMember && (
          <Box sx={{ px: 2, py: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            <Button fullWidth onClick={() => { navigate("/signup"); setDrawerOpen(false); }}
              sx={{
                textTransform: "none", color: "#e8eaf0", borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.15)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
              }}>
              Sign Up
            </Button>
            <Button fullWidth variant="contained"
              onClick={() => { navigate("/login"); setDrawerOpen(false); }}
              sx={{ textTransform: "none", borderRadius: 2, bgcolor: "#3b82f6", "&:hover": { bgcolor: "#2563eb" } }}>
              Login
            </Button>
          </Box>
        )}
      </Drawer>

    </Box>
  );
}