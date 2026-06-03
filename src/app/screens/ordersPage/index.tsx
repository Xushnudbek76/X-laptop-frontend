import { type SyntheticEvent, useEffect, useState } from "react";
import { Container, Tab, Tabs, Typography, Avatar } from "@mui/material";
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
import "../../../css/orders.css";

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
  const [orderInquiry] = useState<OrderInquiry>({
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
      .then((data) => setPausedOrders(data))
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
    <section className="orders-page app-page app-page--dark">
      <div className="app-page-header">
        <ShoppingBagOutlinedIcon className="app-page-header__icon" />
        <Typography className="app-page-header__title">My Orders</Typography>
      </div>

      <Container maxWidth="lg" className="orders-page__container">
        <div className="orders-page__layout">
          <div className="orders-page__tabs">
            <TabContext value={value}>
              <div className="app-shell-card orders-page__tabs-shell">
                <Tabs value={value} onChange={handleChange}>
                  {[
                    { label: "Paused", count: pausedOrders.length },
                    { label: "Processing", count: processOrders.length },
                    { label: "Finished", count: finishedOrders.length },
                  ].map((tab, index) => (
                    <Tab
                      key={tab.label}
                      value={String(index + 1)}
                      label={
                        <span className="orders-page__tab-label">
                          {tab.label}
                          <span
                            className={`orders-page__tab-count${
                              value === String(index + 1) ? " is-active" : ""
                            }`}
                          >
                            {tab.count}
                          </span>
                        </span>
                      }
                    />
                  ))}
                </Tabs>
              </div>

              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </TabContext>
          </div>

          <aside className="orders-page__sidebar">
            <div className="app-shell-card orders-page__user-card">
              <div className="orders-page__user-banner" />
              <div className="orders-page__avatar-wrap">
                {authMember?.memberImage ? (
                  <Avatar
                    src={`${serverApi}/${authMember.memberImage}`}
                    className="orders-page__avatar"
                  />
                ) : (
                  <div className="orders-page__avatar-fallback">
                    <PersonOutlineIcon className="orders-page__avatar-icon" />
                  </div>
                )}
              </div>

              <div className="orders-page__user-content">
                <Typography className="orders-page__user-name">{authMember?.memberNick}</Typography>
                <Typography className="orders-page__user-role">{authMember?.memberType}</Typography>
                <div className="app-shell-divider orders-page__user-divider" />
                <div className="orders-page__user-row">
                  <LocationOnOutlinedIcon className="orders-page__user-row-icon" />
                  <Typography className="orders-page__user-row-text">
                    {authMember?.memberAddress ?? "No address"}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="app-shell-card orders-page__stats-card">
              <Typography className="orders-page__stats-title">Order Overview</Typography>
              <div className="orders-page__stats-list">
                <div className="orders-page__stats-row">
                  <div className="orders-page__stats-label">
                    <PauseCircleOutlineIcon className="orders-page__stats-icon orders-page__stats-icon--paused" />
                    <span>Paused</span>
                  </div>
                  <span className="orders-page__stats-value">{pausedOrders.length}</span>
                </div>
                <div className="orders-page__stats-row">
                  <div className="orders-page__stats-label">
                    <AccessTimeIcon className="orders-page__stats-icon orders-page__stats-icon--processing" />
                    <span>Processing</span>
                  </div>
                  <span className="orders-page__stats-value">{processOrders.length}</span>
                </div>
                <div className="orders-page__stats-row">
                  <div className="orders-page__stats-label">
                    <CheckCircleOutlineIcon className="orders-page__stats-icon orders-page__stats-icon--finished" />
                    <span>Finished</span>
                  </div>
                  <span className="orders-page__stats-value">{finishedOrders.length}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
