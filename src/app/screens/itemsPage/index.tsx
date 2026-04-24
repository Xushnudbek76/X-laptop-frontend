import { Route, Routes } from "react-router-dom";
import ChosenLaptop from "./ChosenLaptop";
import LaptopList from "./LaptopList";
import { Box } from "@mui/material";
import StoreMap from "./StoreMap";

export default function ItemsPage() {


  return (
    <Routes>
      <Route path=":laptopId" element={<ChosenLaptop />} />
      <Route
        index
        element={
          <Box sx={{ bgcolor: "#0a0f1e", minHeight: "100vh" }}>
            <LaptopList/>
            <StoreMap />
          </Box>
        }
      />
    </Routes>
  );
}