import { Box, Stack, Typography } from "@mui/material";

const footerLinks = {
  Company: ["About us", "Careers", "Press", "Blog"],
  Products: ["Laptops", "Gaming", "Business", "Accessories"],
  Support: ["Help center", "Warranty", "Returns", "Contact"],
};

const socials = [
  {
    label: "Twitter",
    path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  },
  {
    label: "LinkedIn",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  },
  {
    label: "GitHub",
    path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  },
  { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" },
];

export default function Footer() {
  return (
    <Box sx={{ background: "#0a0f1e", pt: 7 }}>
      <Stack sx={{ maxWidth: "1200px", mx: "auto", px: 3 }}>
        {/* Main Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr 1fr 1fr" },
            gap: { xs: 4, md: 6 },
            pb: 6,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand Column */}
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "1px",
                mb: 1.5,
              }}
            >
              X<span style={{ color: "#3b82f6" }}>-</span>LAPTOP
            </Typography>
            <Typography
              sx={{
                fontSize: "13.5px",
                color: "#64748b",
                lineHeight: 1.75,
                mb: 2.5,
                maxWidth: "260px",
              }}
            >
              Your trusted destination for premium laptops. Cutting-edge technology, expert reviews,
              and unbeatable deals — all in one place.
            </Typography>

            {/* Email */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "9px",
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </Box>
              <Typography
                component="a"
                href="mailto:xushnudbek76n@gmail.com"
                sx={{
                  fontSize: "13px",
                  color: "#93c5fd",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                xushnudbek76n@gmail.com
              </Typography>
            </Box>

            {/* Socials */}
            <Box sx={{ display: "flex", gap: 1.2, mt: 2.5 }}>
              {socials.map((s) => (
                <Box
                  key={s.label}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      background: "rgba(59,130,246,0.15)",
                      borderColor: "rgba(59,130,246,0.4)",
                    },
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={s.path} />
                  </svg>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Box key={title}>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#3b82f6",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  mb: 2.2,
                }}
              >
                {title}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
                {links.map((link) => (
                  <Typography
                    key={link}
                    component="a"
                    href="#"
                    sx={{
                      fontSize: "13.5px",
                      color: "#94a3b8",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      "&:hover": { color: "#ffffff" },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2.5,
          }}
        >
          <Typography sx={{ fontSize: "12.5px", color: "#475569" }}>
            © 2025 X-Laptop. All rights reserved.
          </Typography>
          <Box
            sx={{
              fontSize: "11.5px",
              color: "#3b82f6",
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.25)",
              px: 1.5,
              py: 0.5,
              borderRadius: "20px",
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            Est. 2025
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
