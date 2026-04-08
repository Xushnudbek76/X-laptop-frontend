import { Box } from "@mui/material";

export default function CompanyVideo() {
  return (
    <Box
      sx={{
        width: "100%",
        margin: { xs: "50px 0px", md: "90px 0px" },
        height: { xs: "220px", sm: "320px", md: "550px" },
        display: "flex",
        overflow: "hidden",
        boxShadow: "-3px 0px 20px 14px #34343480",
      }}
    >
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background: "#0c0e12",
          display: "block",
          boxShadow: "0px -8px 90px rgb(215 215 255)",
          transform: { xs: "scale(1)", md: "scale(1.5)" },
        }}
      >
        <source type="video/mp4" src="video/x-laptop.mp4" />
      </Box>
    </Box>
  );
}