import { Box, Container, Typography } from "@mui/material";

const STORES = [
  { name: "X-Laptop Seoul",   address: "123 Gangnam-daero, Seoul",      coords: "37.498,127.027" },
  { name: "X-Laptop Suwon",   address: "45 Ingye-ro, Suwon",            coords: "37.263,127.028" },
  { name: "X-Laptop Busan",   address: "78 Haeundae-ro, Busan",         coords: "35.158,129.160" },
];

export default function StoreMap() {
  return (
    <Box sx={{ py: 8, bgcolor: "#080d1a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", letterSpacing: 3, textTransform: "uppercase", mb: 1 }}>
            Find Us
          </Typography>
          <Typography sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 900, color: "#fff" }}>
            Our Stores
          </Typography>
        </Box>

        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3, alignItems: "start",
        }}>
          {/* Map iframe */}
          <Box sx={{
            borderRadius: "16px", overflow: "hidden",
            border: "1px solid rgba(59,130,246,0.2)",
            height: { xs: "250px", md: "400px" },
          }}>
            <iframe
              title="X-Laptop Store Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253041.97290388512!2d126.72834086059566!3d37.56653565004597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d5c39cf%3A0x7e11eca1405bf29b!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2s!4v1712000000000"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
            />
          </Box>

          {/* Store Cards */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {STORES.map((store, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: "#1e293b", borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  p: 2.5, display: "flex", alignItems: "flex-start", gap: 2,
                  transition: "all 0.2s",
                  "&:hover": { borderColor: "rgba(59,130,246,0.3)", boxShadow: "0 4px 20px rgba(59,130,246,0.1)" },
                }}
              >
                <Box sx={{
                  width: 40, height: 40, borderRadius: "10px", flexShrink: 0,
                  bgcolor: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#fff", mb: 0.4 }}>{store.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: "#64748b", mb: 1 }}>{store.address}</Typography>
                  <Box
                    component="a"
                    href={`https://www.google.com/maps/search/?api=1&query=${store.coords}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontSize: 11, fontWeight: 600, color: "#3b82f6",
                      textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 0.5,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Get directions
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  );
}