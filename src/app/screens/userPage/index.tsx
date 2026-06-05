import { Container, Typography, Avatar, Divider } from "@mui/material";
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
import { resolveAssetUrl } from "../../../lib/config";
import "../../../css/userPage.css";

export default function UserPage() {
  const navigate = useNavigate();
  const { authMember } = useGlobals();

  if (!authMember) {
    navigate("/");
    return null;
  }

  return (
    <section className="user-page app-page app-page--dark">
      <div className="app-page-header">
        <PersonOutlineIcon className="app-page-header__icon" />
        <Typography className="app-page-header__title">My Profile</Typography>
      </div>

      <Container maxWidth="lg" className="user-page__container">
        <div className="user-page__layout">
          <div className="app-shell-card user-page__form-card">
            <div className="user-page__form-head">
              <EditNoteIcon className="user-page__form-icon" />
              <Typography className="user-page__form-title">Edit Profile</Typography>
            </div>
            <Settings />
          </div>

          <aside className="user-page__sidebar">
            <div className="app-shell-card user-page__profile-card">
              <div className="user-page__profile-banner" />
              <div className="user-page__avatar-wrap">
                {authMember.memberImage ? (
                  <Avatar
                    src={resolveAssetUrl(authMember.memberImage)}
                    className="user-page__avatar"
                  />
                ) : (
                  <div className="user-page__avatar-fallback">
                    <PersonOutlineIcon className="user-page__avatar-icon" />
                  </div>
                )}
              </div>

              <div className="user-page__profile-content">
                <Typography className="user-page__name">{authMember.memberNick}</Typography>
                <Typography className="user-page__role">{authMember.memberType}</Typography>

                <Divider className="user-page__divider" />

                <div className="user-page__info-list">
                  {authMember.memberPhone && (
                    <div className="user-page__info-row">
                      <PhoneIcon className="user-page__info-icon" />
                      <Typography className="user-page__info-text">{authMember.memberPhone}</Typography>
                    </div>
                  )}
                  <div className="user-page__info-row">
                    <LocationOnOutlinedIcon className="user-page__info-icon" />
                    <Typography className="user-page__info-text">
                      {authMember.memberAddress ?? "No address"}
                    </Typography>
                  </div>
                </div>

                {authMember.memberDesc && (
                  <>
                    <Divider className="user-page__divider" />
                    <Typography className="user-page__desc">{authMember.memberDesc}</Typography>
                  </>
                )}

                <div className="user-page__social-divider">
                  <Divider className="user-page__divider" />
                </div>
                <div className="user-page__socials">
                  <div className="user-page__social user-page__social--facebook">
                    <FacebookIcon />
                  </div>
                  <div className="user-page__social user-page__social--instagram">
                    <InstagramIcon />
                  </div>
                  <div className="user-page__social user-page__social--telegram">
                    <TelegramIcon />
                  </div>
                  <div className="user-page__social user-page__social--youtube">
                    <YouTubeIcon />
                  </div>
                </div>
              </div>
            </div>

            <div className="app-shell-card user-page__points-card">
              <Typography className="user-page__points-title">Member Points</Typography>
              <div className="user-page__points-box">
                <Typography className="user-page__points-label">Available Points</Typography>
                <Typography className="user-page__points-value">
                  {authMember.memberPoints.toLocaleString()}
                </Typography>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
