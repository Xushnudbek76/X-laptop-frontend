// src/app/components/header/HomeNavbar.tsx
import { useState } from "react";
import {
  AppBar, Toolbar, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Avatar, Container,
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
  const authMember = true;

  const allLinks = authMember ? [...navLinks, ...authNavLinks] : navLinks;

  return (
    <div className="home-navbar">
      <AppBar position="fixed" elevation={0} sx={{
        bgcolor: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <Toolbar sx={{ px: "0 !important", minHeight: "64px !important" }}>

          {/* ✅ Container is INSIDE Toolbar */}
          <Container maxWidth="lg" sx={{
            display: "flex", alignItems: "center",
          }}>

            {/* Logo */}
            <Box sx={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: 16,
              letterSpacing: 2, color: "#fff", cursor: "pointer" }}
              onClick={() => navigate("/")}>
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
                  sx={{ width: 38, height: 38, cursor: "pointer",
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

      {/* Mobile Drawer */}
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
    </div>
  );
}