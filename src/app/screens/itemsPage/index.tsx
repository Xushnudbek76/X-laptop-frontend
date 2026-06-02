import { Route, Routes } from "react-router-dom";
import ChosenLaptop from "./ChosenLaptop";
import LaptopList from "./LaptopList";
import { Box } from "@mui/material";
import StoreMap from "./StoreMap";
import type { CartItem } from "../../../lib/types/cart";
import "../../../css/laptops.css";

interface ItemsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ItemsPage(props: ItemsPageProps) {
  const { onAdd } = props;

  return (
    <div className="laptops-page">
      <Routes>
        <Route path=":laptopId" element={<ChosenLaptop handleAddToCart={onAdd} />} />
        <Route
          index
          element={
            <Box className="laptops-page__listing">
              <LaptopList handleAddToCart={onAdd} />
              <StoreMap />
            </Box>
          }
        />
      </Routes>
    </div>
  );
}
