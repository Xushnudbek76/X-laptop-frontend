// src/app/components/header/OtherNavbar.tsx
import { useState } from "react";
import {
  AppBar, Toolbar, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Avatar,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Laptops", path: "/laptops" },
  { label: "Help", path: "/help" },
];

const authNavLinks = [
  { label: "Orders", path: "/orders" },
  { label: "My Page", path: "/member-page" },
];

export default function OtherNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const authMember = null; // replace with: useSelector((state: RootState) => state.yourSlice.authMember)

  const isActive = (path: string) => location.pathname === path;
  const allLinks = authMember ? [...navLinks, ...authNavLinks] : navLinks;

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{
        bgcolor: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)", color: "#111",
      }}>
        <Toolbar sx={{ px: { xs: 2, md: 3 }, minHeight: "64px !important" }}>

          {/* Logo */}
          <Box sx={{ fontWeight: 700, fontSize: 15, letterSpacing: 0.5, cursor: "pointer" }}
            onClick={() => navigate("/")}>
            X-LAPTOP
          </Box>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, flex: 1, ml: 4 }}>
            {allLinks.map(({ label, path }) => (
              <Button key={label} onClick={() => navigate(path)}
                sx={{
                  fontSize: 14, fontWeight: isActive(path) ? 500 : 400,
                  color: isActive(path) ? "#2563eb" : "#64748b",
                  textTransform: "none", px: 1.75, py: 0.75,
                  borderRadius: 2, minWidth: "auto", position: "relative",
                  "&:hover": { bgcolor: "#f1f5f9", color: "#111" },
                  "&::after": isActive(path) ? {
                    content: '""', position: "absolute", bottom: 4,
                    left: 14, right: 14, height: 2,
                    bgcolor: "#2563eb", borderRadius: 1,
                  } : {},
                }}>
                {label}
              </Button>
            ))}
          </Box>

          {/* Desktop Right — cart + login/signup OR avatar */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1, ml: "auto" }}>
            <IconButton size="small" sx={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 2, p: 0.75 }}>
              <ShoppingCartOutlinedIcon sx={{ fontSize: 18, color: "#64748b" }} />
            </IconButton>

            {!authMember ? (
              <>
                <Button onClick={() => navigate("/signup")}
                  sx={{
                    fontSize: 14, color: "#64748b", textTransform: "none",
                    px: 2.5, borderRadius: 2, border: "1px solid rgba(0,0,0,0.1)",
                    "&:hover": { bgcolor: "#f1f5f9" },
                  }}>
                  Sign Up
                </Button>
                <Button variant="contained" onClick={() => navigate("/login")}
                  sx={{
                    fontSize: 14, fontWeight: 500, textTransform: "none",
                    px: 2.5, borderRadius: 2, bgcolor: "#2563eb",
                    "&:hover": { bgcolor: "#1d4ed8" },
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
                  width: 36, height: 36, cursor: "pointer",
                  border: "2px solid rgba(37,99,235,0.4)",
                  "&:hover": { border: "2px solid #2563eb" },
                }}
              />
            )}
          </Box>

          {/* Mobile Hamburger */}
          <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
            <IconButton onClick={() => setDrawerOpen(true)}
              sx={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 2, p: 0.75 }}>
              <MenuIcon sx={{ fontSize: 20, color: "#64748b" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, pt: 1 } }}>

        {/* Drawer header — avatar if logged in */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pb: 1 }}>
          {authMember ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                src={authMember?.memberImage ?? "/icons/default-user.svg"}
                sx={{ width: 32, height: 32, border: "2px solid rgba(37,99,235,0.4)" }}
              />
              <Box sx={{ fontSize: 13, color: "#111", fontWeight: 500 }}>
                {authMember?.memberNick ?? "Member"}
              </Box>
            </Box>
          ) : <Box />}
          <IconButton onClick={() => setDrawerOpen(false)} size="small">
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        <Divider />

        <List dense>
          {allLinks.map(({ label, path }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton onClick={() => { navigate(path); setDrawerOpen(false); }}
                sx={{ px: 2.5, py: 1.25, color: isActive(path) ? "#2563eb" : "inherit" }}>
                <ListItemText primary={label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: isActive(path) ? 500 : 400 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <Box sx={{ px: 2, py: 1.5, display: "flex", gap: 1 }}>
          <IconButton sx={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 2 }}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 18, color: "#64748b" }} />
          </IconButton>

          {!authMember && (
            <>
              <Button fullWidth onClick={() => { navigate("/signup"); setDrawerOpen(false); }}
                sx={{
                  textTransform: "none", color: "#64748b", borderRadius: 2,
                  border: "1px solid rgba(0,0,0,0.1)",
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}>
                Sign Up
              </Button>
              <Button fullWidth variant="contained"
                onClick={() => { navigate("/login"); setDrawerOpen(false); }}
                sx={{ textTransform: "none", borderRadius: 2, bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" } }}>
                Login
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}