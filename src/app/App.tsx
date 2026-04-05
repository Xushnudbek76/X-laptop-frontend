import { Route, Routes, useLocation } from "react-router-dom";
import HomeNavbar from "./components/header/HomeNavbar";
import OtherNavbar from "./components/header/OtherNavbar";
import HomePage from "./screens/homePage";
import LaptopsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import MemberPage from "./screens/userPage";
import HelpPage from "./screens/helpPage";
import "../css/navbar.css";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/laptops" element={<LaptopsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/member-page" element={<MemberPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </>
  );
}

export default App;