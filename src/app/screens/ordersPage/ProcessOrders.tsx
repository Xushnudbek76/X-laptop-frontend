import { Box, Button, Typography } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OrderCard from "./OrderCard";
import { PROCESS_ORDERS } from "./data";

export default function ProcessOrders() {
  return (
    <TabPanel value="2" sx={{ p: 0 }}>
      {PROCESS_ORDERS.map((order, i) => (
        <OrderCard
          key={i}
          order={order}
          actions={
            <>
              {order.date && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mr: 0.5,
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 13, color: "#8892a4" }} />
                  <Typography sx={{ fontSize: 12, color: "#8892a4" }}>
                    {order.date}
                  </Typography>
                </Box>
              )}
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 600,
                  bgcolor: "#0ea5e9",
                  "&:hover": { bgcolor: "#0284c7" },
                  boxShadow: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Verify & Fulfil
              </Button>
            </>
          }
        />
      ))}

      {PROCESS_ORDERS.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 40, color: "#8892a4", mb: 1 }} />
          <Typography sx={{ fontSize: 14, color: "#8892a4" }}>
            No orders in process
          </Typography>
        </Box>
      )}
    </TabPanel>
  );
}
