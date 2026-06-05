import { useState } from "react";
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
import { resolveAssetUrl } from "../../../lib/config";

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
  const avatarSrc = authMember?.memberImage
    ? resolveAssetUrl(authMember.memberImage)
    : "/icons/default-user.svg";

  return (
    <>
      <AppBar position="sticky" elevation={0} className="app-navbar">
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
    </>
  );
}
