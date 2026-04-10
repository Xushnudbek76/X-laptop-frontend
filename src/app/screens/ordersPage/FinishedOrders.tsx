import { Box, Chip, Typography } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import OrderCard from "./OrderCard";
import { FINISHED_ORDERS } from "./data";

export default function FinishedOrders() {
  return (
    <TabPanel value="3" sx={{ p: 0 }}>
      {FINISHED_ORDERS.map((order, i) => (
        <OrderCard
          key={i}
          order={order}
          actions={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {order.date && (
                <Typography sx={{ fontSize: 12, color: "#8892a4" }}>
                  {order.date}
                </Typography>
              )}
              <Chip
                label="Completed"
                size="small"
                icon={
                  <CheckCircleOutlineIcon
                    sx={{
                      fontSize: "14px !important",
                      color: "#4ade80 !important",
                    }}
                  />
                }
                sx={{
                  bgcolor: "rgba(74,222,128,0.1)",
                  color: "#4ade80",
                  fontSize: 11,
                  fontWeight: 600,
                  border: "1px solid rgba(74,222,128,0.25)",
                  "& .MuiChip-icon": { ml: "6px" },
                }}
              />
            </Box>
          }
        />
      ))}

      {FINISHED_ORDERS.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 40, color: "#8892a4", mb: 1 }} />
          <Typography sx={{ fontSize: 14, color: "#8892a4" }}>
            No finished orders yet
          </Typography>
        </Box>
      )}
    </TabPanel>
  );
}
