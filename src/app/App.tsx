import { Route, Routes, useLocation } from "react-router-dom";
import HomeNavbar from "./components/header/HomeNavbar";
import OtherNavbar from "./components/header/OtherNavbar";
import HomePage from "./screens/homePage";
import OrdersPage from "./screens/ordersPage";
import MemberPage from "./screens/userPage";
import HelpPage from "./screens/helpPage";
import Footer from "./components/footer";
import ItemsPage from "./screens/itemsPage";
import useBasket from "./components/hooks/useBasket";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import AuthenticationModal from "./components/auth";
import MemberService from "./services/MemberService";
import { useGlobals } from "./components/hooks/useGlobals";
function App() {
  const location = useLocation();
  const {cartItems, handleAddToCart, handleRemoveFromCart, handleDeleteFromCart, handleDeleteAll} = useBasket();


const [signupOpen, setSignupOpen] = useState<boolean>(false);
const [loginOpen, setLoginOpen] = useState<boolean>(false);
const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
const {setAuthMember} = useGlobals();

const handleSignupClose = () => setSignupOpen(false);
const handleLoginClose = () => setLoginOpen(false);

const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(e.currentTarget);
};

const handleCloseLogout = () => {
  setAnchorEl(null);
};

const handleLogoutRequest = async () => {
  try {
    const memberService = new MemberService();
    await memberService.logout();
    toast.success("Logged out successfully!");
    setAuthMember(null);
  } catch (error) {
    console.log(error);
    toast.error("Logout failed. Please try again.");
  }
};
  return (
    <>
      {location.pathname === "/" ? <HomeNavbar 
      cartItems={cartItems}
      onAdd={handleAddToCart}
      onRemove={handleRemoveFromCart}
      onDelete={handleDeleteFromCart}
      onDeleteAll={handleDeleteAll}
      setSignupOpen={setSignupOpen}
      setLoginOpen={setLoginOpen}
      anchorEl={anchorEl}
      handleLogoutClick={handleLogoutClick}
      handleCloseLogout={handleCloseLogout}
      handleLogoutRequest={handleLogoutRequest}
      /> : <OtherNavbar
  cartItems={cartItems}
  onAdd={handleAddToCart}
  onRemove={handleRemoveFromCart}
  onDelete={handleDeleteFromCart}
  onDeleteAll={handleDeleteAll}
  setSignupOpen={setSignupOpen}
  setLoginOpen={setLoginOpen}
  anchorEl={anchorEl}
  handleLogoutClick={handleLogoutClick}
  handleCloseLogout={handleCloseLogout}
  handleLogoutRequest={handleLogoutRequest}
/>}
        <Toaster position="top-right" richColors/>
      <Routes>
  <Route path="/" element={<HomePage onAdd={handleAddToCart}/>} />
  <Route path="/laptops/*"  element={<ItemsPage

  onAdd={handleAddToCart}
/>} />  
  <Route path="/orders" element={<OrdersPage />} />
  <Route path="/member-page" element={<MemberPage />} />
  <Route path="/help" element={<HelpPage />} />

    </Routes>
      <Footer/>
      <AuthenticationModal
  signupOpen={signupOpen}
  loginOpen={loginOpen}
  handleLoginClose={handleLoginClose}
  handleSignupClose={handleSignupClose}
/>
    </>
  );
}

export default App;