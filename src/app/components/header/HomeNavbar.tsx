import { useState } from "react";
import {
  AppBar, Toolbar, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  Divider, Avatar, Container, Stack, Typography, Menu, MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import type { CartItem } from "../../../lib/types/cart";
import Basket from "./Basket";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Laptops", path: "/laptops" },
  { label: "Help", path: "/help" },
];

const authNavLinks = [
  { label: "Orders", path: "/orders" },
  { label: "My Page", path: "/member-page" },
];

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  anchorEl: HTMLElement | null;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems, onAdd, onRemove, onDelete, onDeleteAll,
    setSignupOpen, setLoginOpen,
    anchorEl, handleLogoutClick, handleCloseLogout, handleLogoutRequest,
  } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const authMember = null; // replace with your auth state

  const isActive = (path: string) => location.pathname === path;
  const allLinks = authMember ? [...navLinks, ...authNavLinks] : navLinks;
  const isHome = location.pathname === "/";

  return (
    <Box sx={{ bgcolor: "#0a0f1e", minHeight: isHome ? "100vh" : "auto" }}>

      {/* ── NAVBAR ── */}
      <AppBar position={isHome ? "fixed" : "sticky"} elevation={0} sx={{
        bgcolor: "rgba(10,15,30,0.85)",
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
                    fontSize: 14, fontWeight: isActive(path) ? 500 : 400,
                    color: isActive(path) ? "#3b82f6" : "#94a3b8",
                    textTransform: "none", px: 2, borderRadius: 2,
                    position: "relative",
                    "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.06)" },
                    "&::after": isActive(path) ? {
                      content: '""', position: "absolute", bottom: 4,
                      left: 14, right: 14, height: 2,
                      bgcolor: "#3b82f6", borderRadius: 1,
                    } : {},
                  }}>
                  {label}
                </Button>
              ))}
            </Box>

            {/* Desktop Right */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, ml: "auto", alignItems: "center" }}>
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />

              {!authMember ? (
                <>
                  <Button
                    onClick={() => setSignupOpen(true)}
                    sx={{
                      fontSize: 14, color: "#e8eaf0", textTransform: "none",
                      px: 2.5, borderRadius: 2, border: "1px solid rgba(255,255,255,0.15)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                    }}>
                    Sign Up
                  </Button>
                  <Button variant="contained"
                    onClick={() => setLoginOpen(true)}
                    sx={{
                      fontSize: 14, fontWeight: 500, textTransform: "none",
                      px: 2.5, borderRadius: 2, bgcolor: "#3b82f6",
                      "&:hover": { bgcolor: "#2563eb" },
                    }}>
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <Avatar
                    src={authMember?.memberImage ?? "/icons/default-user.svg"}
                    onClick={handleLogoutClick}
                    sx={{
                      width: 38, height: 38, cursor: "pointer",
                      border: "2px solid rgba(59,130,246,0.5)",
                      "&:hover": { border: "2px solid #3b82f6" },
                    }}
                  />
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseLogout}
                    PaperProps={{
                      sx: {
                        bgcolor: "#1a1a2e",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "10px",
                        mt: 1,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => { navigate("/member-page"); handleCloseLogout(); }}
                      sx={{ fontSize: 14, color: "#e8eaf0", "&:hover": { bgcolor: "rgba(255,255,255,0.06)" } }}
                    >
                      My Page
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogoutRequest}
                      sx={{ fontSize: 14, color: "#f87171", gap: 1, "&:hover": { bgcolor: "rgba(248,113,113,0.08)" } }}
                    >
                      <LogoutIcon fontSize="small" /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>

            {/* Mobile Hamburger */}
            <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto", gap: 1, alignItems: "center" }}>
              <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} onDelete={onDelete} onDeleteAll={onDeleteAll} />
              <IconButton onClick={() => setDrawerOpen(true)}
                sx={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, p: 0.75 }}>
                <MenuIcon sx={{ fontSize: 20, color: "#94a3b8" }} />
              </IconButton>
            </Box>

          </Container>
        </Toolbar>
      </AppBar>

      {/* ── HERO (only on home page) ── */}
      {isHome && (
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
            {/* LEFT */}
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography sx={{
                fontSize: 11, fontWeight: 600, letterSpacing: 3,
                color: "#3b82f6", textTransform: "uppercase", mb: 2.5,
              }}>
                The Digital Architect Series
              </Typography>
              <Typography sx={{ fontSize: { xs: 52, md: 72, lg: 88 }, fontWeight: 900, lineHeight: 1, color: "#ffffff" }}>
                X-LAPTOP
              </Typography>
              <Typography sx={{ fontSize: { xs: 52, md: 72, lg: 88 }, fontWeight: 900, lineHeight: 1, color: "#3b82f6", mb: 3.5 }}>
                Precision.
              </Typography>
              <Typography sx={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.7, maxWidth: 380, mb: 5, mx: { xs: "auto", md: 0 } }}>
                Engineered from aerospace-grade titanium. Crafted for those who
                define the future. Unrivaled performance meets editorial elegance.
              </Typography>
              <Button
                variant="contained"
                onClick={() => setSignupOpen(true)}
                sx={{
                  fontSize: 15, fontWeight: 600, textTransform: "none",
                  px: 3.5, py: 1.5, borderRadius: 2,
                  bgcolor: "#3b82f6", "&:hover": { bgcolor: "#2563eb" },
                }}
              >
                Sign Up →
              </Button>

              <Stack direction="row" sx={{ mt: 6.5, justifyContent: { xs: "center", md: "flex-start" } }}>
                {[
                  { num: "4.8GHz", label: "Peak Clock" },
                  { num: "22hrs", label: "Uptime" },
                  { num: "1.2kg", label: "Total Mass" },
                ].map(({ num, label }, i) => (
                  <Box key={label} sx={{
                    pr: i < 2 ? 4 : 0, mr: i < 2 ? 4 : 0,
                    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  }}>
                    <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#ffffff" }}>{num}</Typography>
                    <Typography sx={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: "#64748b", textTransform: "uppercase", mt: 0.25 }}>
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
              border: "1px solid rgba(59,130,246,0.15)",
            }}>
              <Box sx={{
                position: "absolute", width: "60%", height: "40%",
                bgcolor: "rgba(59,130,246,0.12)", borderRadius: "50%",
                top: "20%", left: "20%", filter: "blur(40px)",
              }} />
              <Box component="svg" viewBox="0 0 400 280" sx={{ width: "80%", position: "relative", zIndex: 1 }}>
                <rect x="40" y="20" width="320" height="210" rx="12" fill="#2a2a2a" stroke="#444" strokeWidth="2"/>
                <rect x="52" y="32" width="296" height="186" rx="4" fill="#050508"/>
                <defs>
                  <radialGradient id="sg" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#1a2a4a" stopOpacity="0.9"/>
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
      )}

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
                  primaryTypographyProps={{ fontSize: 14, color: isActive(path) ? "#3b82f6" : "#94a3b8" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
        <Box sx={{ px: 2, py: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          {!authMember ? (
            <>
              <Button fullWidth onClick={() => { setSignupOpen(true); setDrawerOpen(false); }}
                sx={{
                  textTransform: "none", color: "#e8eaf0", borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.15)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                }}>Sign Up</Button>
              <Button fullWidth variant="contained"
                onClick={() => { setLoginOpen(true); setDrawerOpen(false); }}
                sx={{ textTransform: "none", borderRadius: 2, bgcolor: "#3b82f6", "&:hover": { bgcolor: "#2563eb" } }}>
                Login
              </Button>
            </>
          ) : (
            <Button fullWidth variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogoutRequest}
              sx={{
                textTransform: "none", borderRadius: 2,
                color: "#f87171", borderColor: "rgba(248,113,113,0.3)",
                "&:hover": { bgcolor: "rgba(248,113,113,0.08)", borderColor: "#f87171" },
              }}>
              Logout
            </Button>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}