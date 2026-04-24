import { Route, Routes, useLocation } from "react-router-dom";
import HomeNavbar from "./components/header/HomeNavbar";
import OtherNavbar from "./components/header/OtherNavbar";
import HomePage from "./screens/homePage";
import OrdersPage from "./screens/ordersPage";
import MemberPage from "./screens/userPage";
import HelpPage from "./screens/helpPage";
import "../css/navbar.css";
import Footer from "./components/footer";
import ItemsPage from "./screens/itemsPage";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/laptops/*" element={<ItemsPage />} />  
  <Route path="/orders" element={<OrdersPage />} />
  <Route path="/member-page" element={<MemberPage />} />
  <Route path="/help" element={<HelpPage />} />
    </Routes>
      <Footer/>
    </>
  );
}

export default App;