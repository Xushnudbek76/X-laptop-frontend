import { Box, Button, Typography } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import OrderCard from "./OrderCard";
import { PAUSED_ORDERS } from "./data";

export default function PausedOrders() {
  return (
    <TabPanel value="1" sx={{ p: 0 }}>
      {PAUSED_ORDERS.map((order, i) => (
        <OrderCard
          key={i}
          order={order}
          actions={
            <>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 600,
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "#8892a4",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 600,
                  bgcolor: "#2563eb",
                  "&:hover": { bgcolor: "#1d4ed8" },
                  boxShadow: "none",
                }}
              >
                Pay Now
              </Button>
            </>
          }
        />
      ))}

      {PAUSED_ORDERS.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
          }}
        >
          <PauseCircleOutlineIcon sx={{ fontSize: 40, color: "#8892a4", mb: 1 }} />
          <Typography sx={{ fontSize: 14, color: "#8892a4" }}>
            No paused orders
          </Typography>
        </Box>
      )}
    </TabPanel>
  );
}
