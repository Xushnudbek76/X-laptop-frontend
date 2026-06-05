import { Box, Container, Typography } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveTopUsers } from "./selector";
import { useSelector } from "react-redux";
import type { Member } from "../../../lib/types/member";
import { resolveAssetUrl } from "../../../lib/config";

const ActiveUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({ topUsers }));

export default function ActiveUsers() {
  const { topUsers } = useSelector(ActiveUsersRetriever);

  return (
    <section className="top-users">
      <Container maxWidth="lg" className="home-section__container">
        <div className="home-section__header">
          <Typography className="home-section__kicker">Community</Typography>
          <Typography className="home-section__title">Active Users</Typography>
        </div>

        {topUsers.length !== 0 ? (
          <div className="top-users__grid">
            {topUsers.map((member: Member) => {
              const image = member.memberImage
                ? resolveAssetUrl(member.memberImage)
                : "/images/default-avatar.png";

              return (
                <div key={member._id} className="top-users__card">
                  <img src={image} alt={member.memberNick} className="top-users__image" />
                  <div className="top-users__shade" />
                  <div className="top-users__overlay" />
                  <Typography className="top-users__name">{member.memberNick}</Typography>
                </div>
              );
            })}
          </div>
        ) : (
          <Box className="home-section__empty">No active users</Box>
        )}
      </Container>
    </section>
  );
}
