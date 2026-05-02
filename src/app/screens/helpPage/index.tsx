import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

const sx = {
  page: {
    bgcolor: "#0a0f1e",
    minHeight: "100vh",
    pb: 10,
  },
  hero: {
    textAlign: "center" as const,
    pt: { xs: 5, md: 8 },
    pb: { xs: 4, md: 6 },
    px: 2,
  },
  heroTitle: {
    fontSize: { xs: 28, md: 40 },
    fontWeight: 700,
    color: "#e8eaf0",
    letterSpacing: "-0.5px",
    mb: 1,
  },
  heroSub: {
    fontSize: { xs: 14, md: 16 },
    color: "#8892a4",
    maxWidth: 480,
    mx: "auto",
    lineHeight: 1.7,
  },
  tabsWrapper: {
    bgcolor: "#1a1a2e",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    p: "6px",
    display: "inline-flex",
    mb: { xs: 3, md: 5 },
  },
};

export default function HelpPage() {
  const [value, setValue] = useState("1");

  return (
    <Box sx={sx.page}>
      {/* Hero */}
      <Box sx={sx.hero}>
        <Box sx={sx.heroTitle}>Help Center</Box>
        <Box sx={sx.heroSub}>
          Find answers to common questions, read our terms, or get in touch with our team.
        </Box>
      </Box>

      <Container maxWidth="md">
        <TabContext value={value}>
          {/* Tabs */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 3, md: 5 } }}>
            <Box sx={sx.tabsWrapper}>
              <Tabs
                value={value}
                onChange={(_, v) => setValue(v)}
                sx={{
                  minHeight: "unset",
                  "& .MuiTabs-indicator": { display: "none" },
                  "& .MuiTab-root": {
                    minHeight: 38,
                    px: { xs: 2, md: 3 },
                    py: 0.75,
                    borderRadius: "10px",
                    fontSize: { xs: 12, md: 13 },
                    fontWeight: 600,
                    color: "#8892a4",
                    textTransform: "none",
                    transition: "all 0.2s",
                    minWidth: { xs: 80, md: 100 },
                  },
                  "& .Mui-selected": {
                    color: "#e8eaf0 !important",
                    bgcolor: "#2563eb",
                    borderRadius: "10px",
                  },
                }}
              >
                <Tab label="Terms" value="1" />
                <Tab label="FAQ" value="2" />
                <Tab label="Contact" value="3" />
              </Tabs>
            </Box>
          </Box>

          {/* ── Terms ── */}
          <TabPanel value="1" sx={{ p: 0 }}>
            <Box
              sx={{
                bgcolor: "#1a1a2e",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                p: { xs: 2.5, md: 4 },
                maxHeight: { xs: "none", md: 560 },
                overflowY: "auto",
                "&::-webkit-scrollbar": { width: 4 },
                "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
                "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(37,99,235,0.4)", borderRadius: 2 },
              }}
            >
              {terms.map((term, i) => (
                <Box
                  key={i}
                  sx={{
                    fontSize: { xs: 13, md: 14 },
                    color: "#8892a4",
                    lineHeight: 1.8,
                    mb: 2,
                    pb: 2,
                    borderBottom:
                      i < terms.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  {term}
                </Box>
              ))}
            </Box>
          </TabPanel>

          {/* ── FAQ ── */}
          <TabPanel value="2" sx={{ p: 0 }}>
            <Stack spacing={1.5}>
              {faq.map((item, i) => (
                <Accordion
                  key={i}
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: "#1a1a2e",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px !important",
                    "&:before": { display: "none" },
                    "&.Mui-expanded": {
                      border: "1px solid rgba(37,99,235,0.4)",
                    },
                    overflow: "hidden",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#3b82f6", fontSize: 20 }} />}
                    sx={{
                      px: { xs: 2, md: 3 },
                      py: 0.5,
                      "& .MuiAccordionSummary-content": { my: 1.5 },
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 600, color: "#e8eaf0" }}
                    >
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      px: { xs: 2, md: 3 },
                      pt: 0,
                      pb: 2.5,
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: 13, md: 14 }, color: "#8892a4", lineHeight: 1.75 }}
                    >
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </TabPanel>

          {/* ── Contact ── */}
          <TabPanel value="3" sx={{ p: 0 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              {/* Contact Info */}
              <Box
                sx={{
                  bgcolor: "#1a1a2e",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  p: { xs: 2.5, md: 3 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  flex: "0 0 auto",
                  width: { xs: "100%", md: 240 },
                }}
              >
                <Box>
                  <Box sx={{ fontSize: 16, fontWeight: 700, color: "#e8eaf0", mb: 0.5 }}>
                    Get in touch
                  </Box>
                  <Box sx={{ fontSize: 13, color: "#8892a4", lineHeight: 1.6 }}>
                    We're happy to help. Reach out and we'll get back to you within 24 hours.
                  </Box>
                </Box>

                {[
                  {
                    icon: <EmailIcon sx={{ fontSize: 16, color: "#3b82f6" }} />,
                    label: "Email",
                    value: "support@xlaptop.com",
                  },
                  {
                    icon: <PhoneIcon sx={{ fontSize: 16, color: "#3b82f6" }} />,
                    label: "Phone",
                    value: "+82 10-1234-5678",
                  },
                  {
                    icon: <LocationOnIcon sx={{ fontSize: 16, color: "#3b82f6" }} />,
                    label: "Location",
                    value: "Suwon, South Korea",
                  },
                ].map((c) => (
                  <Box key={c.label} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "8px",
                        bgcolor: "rgba(37,99,235,0.12)",
                        border: "1px solid rgba(37,99,235,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {c.icon}
                    </Box>
                    <Box>
                      <Box sx={{ fontSize: 11, color: "#8892a4", mb: 0.3 }}>{c.label}</Box>
                      <Box sx={{ fontSize: 13, color: "#e8eaf0", fontWeight: 500 }}>{c.value}</Box>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Form */}
              <Box
                component="form"
                onSubmit={(e) => e.preventDefault()}
                sx={{
                  flex: 1,
                  bgcolor: "#1a1a2e",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  p: { xs: 2.5, md: 3 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box sx={{ fontSize: 16, fontWeight: 700, color: "#e8eaf0" }}>Send a message</Box>

                {[
                  {
                    label: "Your name",
                    name: "name",
                    placeholder: "Type your name here",
                    multiline: false,
                  },
                  {
                    label: "Your email",
                    name: "email",
                    placeholder: "Type your email here",
                    multiline: false,
                  },
                ].map((f) => (
                  <Box key={f.name}>
                    <Box sx={{ fontSize: 12, color: "#8892a4", mb: 0.75, fontWeight: 500 }}>
                      {f.label}
                    </Box>
                    <TextField
                      fullWidth
                      name={f.name}
                      placeholder={f.placeholder}
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "#0f1628",
                          borderRadius: "10px",
                          fontSize: 14,
                          color: "#e8eaf0",
                          "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
                          "&:hover fieldset": { borderColor: "rgba(37,99,235,0.4)" },
                          "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                        },
                        "& input::placeholder": { color: "#8892a4", opacity: 1 },
                      }}
                    />
                  </Box>
                ))}

                <Box>
                  <Box sx={{ fontSize: 12, color: "#8892a4", mb: 0.75, fontWeight: 500 }}>
                    Message
                  </Box>
                  <TextField
                    fullWidth
                    name="message"
                    placeholder="How can we help you?"
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#0f1628",
                        borderRadius: "10px",
                        fontSize: 14,
                        color: "#e8eaf0",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
                        "&:hover fieldset": { borderColor: "rgba(37,99,235,0.4)" },
                        "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                      },
                      "& textarea::placeholder": { color: "#8892a4", opacity: 1 },
                    }}
                  />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#2563eb",
                      borderRadius: "10px",
                      px: 4,
                      py: 1.2,
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: 14,
                      "&:hover": { bgcolor: "#1d4ed8" },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
            </Stack>
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
}
