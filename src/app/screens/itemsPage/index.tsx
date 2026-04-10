// index.tsx
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ChosenLaptop from "./ChosenLaptop";
import LaptopList from "./LaptopList";
import { Box } from "@mui/material";
import StoreMap from "./StoreMap";

export default function ItemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [ram, setRam] = useState("All");
  const [storage, setStorage] = useState("All");
  const [page, setPage] = useState(1);

  return (
    <Routes>
      <Route path=":laptopId" element={<ChosenLaptop />} />
      <Route
        index
        element={
          <Box sx={{ bgcolor: "#0a0f1e", minHeight: "100vh" }}>
            <LaptopList
              search={search}         setSearch={setSearch}
              category={category}     setCategory={setCategory}
              sort={sort}             setSort={setSort}
              priceRange={priceRange} setPriceRange={setPriceRange}
              ram={ram}               setRam={setRam}
              storage={storage}       setStorage={setStorage}
              page={page}             setPage={setPage}
            />
            <StoreMap />
          </Box>
        }
      />
    </Routes>
  );
}