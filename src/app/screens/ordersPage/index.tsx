import { type SyntheticEvent, useEffect, useState } from "react";
import { Box, Container, Stack, Tab, Tabs, Typography, Avatar } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import type { Order, OrderInquiry } from "../../../lib/types/orders";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { useGlobals } from "../../components/hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { useNavigate } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { retrievePausedOrders, retrieveProcessOrders, retrieveFinishedOrders } from "./selector";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(dispatch);
  const navigate = useNavigate();

  const pausedOrders = useSelector(retrievePausedOrders);
  const processOrders = useSelector(retrieveProcessOrders);
  const finishedOrders = useSelector(retrieveFinishedOrders);

  const [value, setValue] = useState("1");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  const { orderBuilder, authMember } = useGlobals();

  useEffect(() => {
    if (!authMember) {
      navigate("/");
      return;
    }
    const orderService = new OrderService();
    orderService
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => {
        console.log("Paused Orders:", data);
        setPausedOrders(data);
      })
      .catch((err) => console.log(err));
    orderService
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderInquiry, orderBuilder]);

  const handleChange = (_: SyntheticEvent, newValue: string) => setValue(newValue);

  return (
    <Box sx={{ bgcolor: "#0a0f1e", minHeight: "100vh", pb: 6 }}>
      {/* Header */}
      <Box sx={{
        bgcolor: "#111827",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        px: { xs: 2, md: 4 },
        py: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}>
        <ShoppingBagOutlinedIcon sx={{ color: "#2563eb", fontSize: 22 }} />
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#e8eaf0" }}>
          My Orders
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="flex-start">

          {/* ── LEFT: tabs ── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TabContext value={value}>
              <Box sx={{
                bgcolor: "#1a1a2e",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                mb: 2,
                overflow: "hidden",
              }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  sx={{
                    px: 1,
                    "& .MuiTabs-indicator": { bgcolor: "#2563eb", height: 2, borderRadius: "2px 2px 0 0" },
                    "& .MuiTab-root": {
                      textTransform: "none", fontWeight: 600, fontSize: 13,
                      color: "#8892a4", minHeight: 48, px: 2,
                      "&.Mui-selected": { color: "#e8eaf0" },
                    },
                  }}
                >
                  {[
                    { label: "Paused", count: pausedOrders.length },
                    { label: "Processing", count: processOrders.length },
                    { label: "Finished", count: finishedOrders.length },
                  ].map((tab, i) => (
                    <Tab
                      key={i}
                      value={String(i + 1)}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          {tab.label}
                          <Box sx={{
                            bgcolor: value === String(i + 1) ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.06)",
                            color: value === String(i + 1) ? "#60a5fa" : "#8892a4",
                            fontSize: 11, fontWeight: 700, borderRadius: "99px", px: 1, lineHeight: 1.8,
                          }}>
                            {tab.count}
                          </Box>
                        </Box>
                      }
                    />
                  ))}
                </Tabs>
              </Box>

              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </TabContext>
          </Box>

          {/* ── RIGHT: user panel ── */}
          <Box sx={{
            width: { xs: "100%", md: 268 },
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
            {/* User card */}
            <Box sx={{
              bgcolor: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              overflow: "hidden",
            }}>
              <Box sx={{ height: 60, background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)" }} />
              <Box sx={{ display: "flex", justifyContent: "center", mt: "-28px", mb: 1.5 }}>
                {authMember?.memberImage ? (
                  <Avatar
                    src={`${serverApi}/${authMember.memberImage}`}
                    sx={{
                      width: 56, height: 56,
                      border: "3px solid #1a1a2e",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                    }}
                  />
                ) : (
                  <Box sx={{
                    width: 56, height: 56, borderRadius: "50%",
                    bgcolor: "rgba(37,99,235,0.2)", border: "3px solid #1a1a2e",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                  }}>
                    <PersonOutlineIcon sx={{ color: "#60a5fa", fontSize: 26 }} />
                  </Box>
                )}
              </Box>

              <Box sx={{ textAlign: "center", pb: 2.5, px: 2.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#e8eaf0" }}>
                  {authMember?.memberNick ?? "Member"}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#8892a4", mb: 2 }}>
                  {authMember?.memberType ?? "User"}
                </Typography>

                <Box sx={{ height: "1px", bgcolor: "rgba(255,255,255,0.06)", mb: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center", mb: 2 }}>
                  <LocationOnOutlinedIcon sx={{ fontSize: 15, color: "#2563eb" }} />
                  <Typography sx={{ fontSize: 13, color: "#8892a4" }}>
                    {authMember?.memberAddress ?? "No address"}
                  </Typography>
                </Box>

                {/* Stats */}
                <Stack direction="row" sx={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
                  {[
                    { label: "Total", value: String(pausedOrders.length + processOrders.length + finishedOrders.length) },
                    { label: "Done", value: String(finishedOrders.length) },
                    { label: "Active", value: String(pausedOrders.length + processOrders.length) },
                  ].map((s, i) => (
                    <Box key={i} sx={{
                      flex: 1, py: 1.2,
                      borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      bgcolor: "rgba(255,255,255,0.02)",
                    }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#e8eaf0" }}>{s.value}</Typography>
                      <Typography sx={{ fontSize: 10, color: "#8892a4", mt: 0.2 }}>{s.label}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* Status legend */}
            <Box sx={{
              bgcolor: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              p: 2.5,
            }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#e8eaf0", mb: 1.5 }}>
                Order Status
              </Typography>
              {[
                { label: "Paused", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", count: pausedOrders.length, icon: <PauseCircleOutlineIcon sx={{ fontSize: 15, color: "#f59e0b" }} /> },
                { label: "Processing", color: "#38bdf8", bg: "rgba(56,189,248,0.12)", count: processOrders.length, icon: <AccessTimeIcon sx={{ fontSize: 15, color: "#38bdf8" }} /> },
                { label: "Finished", color: "#4ade80", bg: "rgba(74,222,128,0.12)", count: finishedOrders.length, icon: <CheckCircleOutlineIcon sx={{ fontSize: 15, color: "#4ade80" }} /> },
              ].map((s, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: i < 2 ? 1.2 : 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {s.icon}
                    <Typography sx={{ fontSize: 13, color: "#8892a4" }}>{s.label}</Typography>
                  </Box>
                  <Box sx={{ bgcolor: s.bg, color: s.color, fontSize: 12, fontWeight: 700, borderRadius: "99px", px: 1.5, py: 0.3 }}>
                    {s.count}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}