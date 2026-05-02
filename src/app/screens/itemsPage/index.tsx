import { Route, Routes } from "react-router-dom";
import ChosenLaptop from "./ChosenLaptop";
import LaptopList from "./LaptopList";
import { Box } from "@mui/material";
import StoreMap from "./StoreMap";
import type { CartItem } from "../../../lib/types/cart";

interface ItemsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ItemsPage(props: ItemsPageProps) {
  const { onAdd } = props;

  return (
    <Routes>
      <Route path=":laptopId" element={<ChosenLaptop handleAddToCart={onAdd} />} />
      <Route
        index
        element={
          <Box sx={{ bgcolor: "#0a0f1e", minHeight: "100vh" }}>
            <LaptopList handleAddToCart={onAdd} />
            <StoreMap />
          </Box>
        }
      />
    </Routes>
  );
}
