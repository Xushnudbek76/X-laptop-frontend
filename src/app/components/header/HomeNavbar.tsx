import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
  Container,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import type { CartItem } from "../../../lib/types/cart";
import Basket from "./Basket";
import { useGlobals } from "../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

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
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    anchorEl,
    handleLogoutClick,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { authMember } = useGlobals();

  const isActive = (path: string) => location.pathname === path;
  const allLinks = authMember ? [...navLinks, ...authNavLinks] : navLinks;

  useEffect(() => {
    handleCloseLogout();
  }, [authMember, handleCloseLogout]);

  const avatarSrc = authMember?.memberImage
    ? `${serverApi}/${authMember.memberImage}`
    : "/icons/default-user.svg";

  return (
    <div className="app-navbar-shell app-navbar-shell--home">
      <AppBar position="fixed" elevation={0} className="app-navbar app-navbar--home">
        <Toolbar className="app-navbar__toolbar">
          <Container maxWidth="lg" className="app-navbar__container">
            <Box onClick={() => navigate("/")} className="app-navbar__logo">
              <span className="app-navbar__logo-accent">X-</span>
              LAPTOP
            </Box>

            <Box className="app-navbar__links">
              {allLinks.map(({ label, path }) => (
                <Button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`app-navbar__link${isActive(path) ? " is-active" : ""}`}
                >
                  {label}
                </Button>
              ))}
            </Box>

            <Box className="app-navbar__actions">
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
                    className="app-navbar__auth-button app-navbar__auth-button--ghost"
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setLoginOpen(true)}
                    className="app-navbar__auth-button app-navbar__auth-button--primary"
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <Avatar
                    src={avatarSrc}
                    onClick={handleLogoutClick}
                    className="app-navbar__avatar"
                  />
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseLogout}
                    PaperProps={{ className: "app-navbar__menu-paper" }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/member-page");
                        handleCloseLogout();
                      }}
                      className="app-navbar__menu-item app-navbar__menu-item--default"
                    >
                      My Page
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogoutRequest}
                      className="app-navbar__menu-item app-navbar__menu-item--danger"
                    >
                      <LogoutIcon fontSize="small" /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>

            <Box className="app-navbar__mobile">
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
              <IconButton
                onClick={() => setDrawerOpen(true)}
                className="app-navbar__hamburger"
                size="small"
              >
                <MenuIcon className="app-navbar__hamburger-icon" />
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <div className="app-hero">
          <div className="app-hero__content">
            <Typography className="app-hero__eyebrow">The Digital Architect Series</Typography>
            <Typography component="h1" className="app-hero__title">
              X-LAPTOP
            </Typography>
            <Typography component="h2" className="app-hero__accent">
              Precision.
            </Typography>
            <Typography className="app-hero__description">
              Engineered from aerospace-grade titanium. Crafted for those who define the future.
              Unrivaled performance meets editorial elegance.
            </Typography>

            {!authMember ? (
              <Button
                variant="contained"
                onClick={() => setSignupOpen(true)}
                className="app-hero__cta"
              >
                Sign Up →
              </Button>
            ) : null}

            <Stack direction="row" className="app-hero__stats">
              {[
                { num: "4.8GHz", label: "Peak Clock" },
                { num: "22hrs", label: "Uptime" },
                { num: "1.2kg", label: "Total Mass" },
              ].map(({ num, label }) => (
                <div key={label} className="app-hero__stat">
                  <Typography className="app-hero__stat-value">{num}</Typography>
                  <Typography className="app-hero__stat-label">{label}</Typography>
                </div>
              ))}
            </Stack>
          </div>

          <div className="app-hero__visual">
            <div className="app-hero__glow" />
            <Box component="svg" viewBox="0 0 400 280" className="app-hero__laptop-svg">
              <rect
                x="40"
                y="20"
                width="320"
                height="210"
                rx="12"
                fill="#2a2a2a"
                stroke="#444"
                strokeWidth="2"
              />
              <rect x="52" y="32" width="296" height="186" rx="4" fill="#050508" />
              <defs>
                <radialGradient id="hero-screen-gradient" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#1a2a4a" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#050508" />
                </radialGradient>
              </defs>
              <rect x="52" y="32" width="296" height="186" rx="4" fill="url(#hero-screen-gradient)" />
              <ellipse cx="200" cy="28" rx="4" ry="4" fill="#333" />
              <rect
                x="10"
                y="232"
                width="380"
                height="18"
                rx="6"
                fill="#3a3a3a"
                stroke="#555"
                strokeWidth="1.5"
              />
              <rect x="150" y="233" width="100" height="8" rx="4" fill="#2a2a2a" />
            </Box>
          </div>
        </div>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ className: "app-navbar__drawer-paper" }}
      >
        <div className="app-navbar__drawer-top">
          {authMember ? (
            <div className="app-navbar__drawer-user">
              <Avatar src={avatarSrc} className="app-navbar__drawer-avatar" />
              <div className="app-navbar__drawer-name">{authMember.memberNick ?? "Member"}</div>
            </div>
          ) : (
            <div />
          )}
          <IconButton onClick={() => setDrawerOpen(false)} size="small">
            <CloseIcon className="app-navbar__drawer-close" />
          </IconButton>
        </div>

        <Divider className="app-navbar__drawer-divider" />

        <List dense>
          {allLinks.map(({ label, path }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(path);
                  setDrawerOpen(false);
                }}
                className="app-navbar__drawer-link"
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    className: `app-navbar__drawer-link-text${isActive(path) ? " is-active" : ""}`,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider className="app-navbar__drawer-divider" />

        <div className="app-navbar__drawer-actions">
          {!authMember ? (
            <>
              <Button
                fullWidth
                onClick={() => {
                  setSignupOpen(true);
                  setDrawerOpen(false);
                }}
                className="app-navbar__drawer-button app-navbar__drawer-button--ghost"
              >
                Sign Up
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setLoginOpen(true);
                  setDrawerOpen(false);
                }}
                className="app-navbar__drawer-button app-navbar__drawer-button--primary"
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogoutRequest}
              className="app-navbar__drawer-button app-navbar__drawer-button--danger"
            >
              Logout
            </Button>
          )}
        </div>
      </Drawer>
    </div>
  );
}
