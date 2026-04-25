import { useState } from "react";
import {
  AppBar, Toolbar, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  Divider, Avatar, Container, Menu, MenuItem,
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

interface OtherNavbarProps {
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

export default function OtherNavbar(props: OtherNavbarProps) {
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

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{
        bgcolor: "rgba(10,15,30,0.95)",
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

            {/* Mobile */}
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
                }}>
                Sign Up
              </Button>
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
    </>
  );
}