import { type ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  InputBase,
  Select,
  MenuItem,
  Chip,
  Pagination,
  PaginationItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type Dispatch, createSelector } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import type { Item, ProductInquiry } from "../../../lib/types/item";
import { retrieveProducts } from "./selector";
import { resolveAssetUrl } from "../../../lib/config";
import ItemService from "../../services/ProductService";
import { LaptopCategory, LaptopRam, LaptopStorage } from "../../../lib/enums/item.enum";
import type { CartItem } from "../../../lib/types/cart";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Item[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const CATEGORIES = ["All", ...Object.values(LaptopCategory)];
const RAM_VALUES = Object.values(LaptopRam).filter(
  (value): value is LaptopRam => typeof value === "number"
);
const STORAGE_VALUES = Object.values(LaptopStorage).filter(
  (value): value is LaptopStorage => typeof value === "number"
);
const RAM_OPTIONS = ["All", ...RAM_VALUES.map(String)];
const STORAGE_OPTIONS = ["All", ...STORAGE_VALUES.map(String)];

const formatRamLabel = (value: string) => (value === "All" ? value : `${value} GB`);
const formatStorageLabel = (value: string) => {
  if (value === "All") return value;
  const storage = Number(value);
  return storage >= 1000 ? `${storage / 1000} TB` : `${storage} GB`;
};

function FilterChips({
  label,
  options,
  value,
  onChange,
  getLabel,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  getLabel?: (v: string) => string;
}) {
  return (
    <div className="laptops-page__filter-group">
      <div className="laptops-page__filter-label">{label}</div>
      <div className="laptops-page__filter-chips">
        {options.map((opt) => (
          <Chip
            key={opt}
            label={getLabel ? getLabel(opt) : opt}
            onClick={() => onChange(opt)}
            size="small"
            className={`laptops-page__filter-chip${value === opt ? " is-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

interface ItemsProps {
  handleAddToCart: (product: CartItem) => void;
}

export default function LaptopList(props: ItemsProps) {
  const { handleAddToCart } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const navigate = useNavigate();

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    laptopCategory: undefined,
    search: "",
  });
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [category, setCategory] = useState("All");
  const [ram, setRam] = useState("All");
  const [storage, setStorage] = useState("All");
  const [cartAdded, setCartAdded] = useState<string[]>([]);
  const [gridView, setGridView] = useState(true);

  useEffect(() => {
    const item = new ItemService();
    item
      .getItems(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(productSearch)]);

  useEffect(() => {
    if (searchText === "") {
      setProductSearch((prev) => ({ ...prev, search: "", page: 1 }));
    }
  }, [searchText]);

  const searchHandler = () => {
    setProductSearch((prev) => ({ ...prev, search: searchText, page: 1 }));
  };

  const orderHandler = (order: string) => {
    setSort(order);
    setProductSearch((prev) => ({ ...prev, order, page: 1 }));
  };

  const categoryHandler = (value: string) => {
    setCategory(value);
    setProductSearch((prev) => ({
      ...prev,
      laptopCategory: value === "All" ? undefined : (value as LaptopCategory),
      page: 1,
    }));
  };

  const ramHandler = (value: string) => {
    setRam(value);
    setProductSearch((prev) => ({
      ...prev,
      laptopRam: value === "All" ? undefined : (Number(value) as LaptopRam),
      page: 1,
    }));
  };

  const storageHandler = (value: string) => {
    setStorage(value);
    setProductSearch((prev) => ({
      ...prev,
      laptopStorage: value === "All" ? undefined : (Number(value) as LaptopStorage),
      page: 1,
    }));
  };

  const paginationHandler = (_e: ChangeEvent<unknown>, value: number) => {
    setProductSearch((prev) => ({ ...prev, page: value }));
  };

  const resetFilters = () => {
    setSearchText("");
    setCategory("All");
    setRam("All");
    setStorage("All");
    setSort("createdAt");
    setProductSearch({
      page: 1,
      limit: 8,
      order: "createdAt",
      laptopCategory: undefined,
      search: "",
    });
  };

  const addToCart = (e: React.MouseEvent, laptop: Item) => {
    e.stopPropagation();
    handleAddToCart(laptop as unknown as CartItem);
    setCartAdded((prev) => (prev.includes(laptop._id) ? prev : [...prev, laptop._id]));
  };

  const cardGridClass = gridView ? "laptops-page__grid laptops-page__grid--cards" : "laptops-page__grid laptops-page__grid--rows";

  return (
    <section className="laptops-page__content">
      <Container maxWidth="lg">
        <div className="laptops-page__header">
          <Typography className="laptops-page__kicker">Our Collection</Typography>
          <div className="laptops-page__header-row">
            <Typography className="laptops-page__heading">All Laptops</Typography>
            <Typography className="laptops-page__results">{products.length} results</Typography>
          </div>
        </div>

        <div className="laptops-page__controls">
          <div className="laptops-page__search">
            <svg
              className="laptops-page__search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <InputBase
              placeholder="Search laptops..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchHandler();
              }}
              className="laptops-page__search-input"
            />
            {searchText && (
              <div onClick={() => setSearchText("")} className="laptops-page__search-clear">
                ×
              </div>
            )}
          </div>

          <Select
            value={sort}
            onChange={(e) => orderHandler(e.target.value)}
            size="small"
            className="laptops-page__sort"
          >
            <MenuItem value="createdAt">Sort: Newest</MenuItem>
            <MenuItem value="laptopPrice">Price: Low → High</MenuItem>
            <MenuItem value="laptopViews">Most Viewed</MenuItem>
          </Select>

          <div className="laptops-page__view-toggle">
            {[true, false].map((isGrid) => (
              <div
                key={String(isGrid)}
                onClick={() => setGridView(isGrid)}
                className={`laptops-page__view-button${gridView === isGrid ? " is-active" : ""}`}
              >
                {isGrid ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div onClick={resetFilters} className="laptops-page__reset">
            Reset
          </div>
        </div>

        <FilterChips
          label="Category"
          options={CATEGORIES}
          value={category}
          onChange={categoryHandler}
        />
        <FilterChips label="RAM" options={RAM_OPTIONS} value={ram} onChange={ramHandler} getLabel={formatRamLabel} />
        <FilterChips
          label="Storage"
          options={STORAGE_OPTIONS}
          value={storage}
          onChange={storageHandler}
          getLabel={formatStorageLabel}
        />

        {products.length === 0 ? (
          <div className="laptops-page__empty">
            <Typography className="laptops-page__empty-text">No laptops found.</Typography>
            <div onClick={resetFilters} className="laptops-page__clear">
              Clear all filters
            </div>
          </div>
        ) : (
          <div className={cardGridClass}>
            {products.map((laptop: Item) => {
              const image = resolveAssetUrl(laptop.laptopImages[0]);
              const inStock = laptop.laptopLeftCount > 0;
              const isAdded = cartAdded.includes(laptop._id);
              const cartClass = [
                "laptops-page__cart-button",
                isAdded ? "is-added" : "",
                !inStock ? "is-disabled" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={laptop._id}
                  onClick={() => navigate(`${laptop._id}`)}
                  className={`laptops-page__card${gridView ? "" : " laptops-page__card--list"}`}
                >
                  <div className="laptops-page__image-wrap">
                    <img src={image} alt={laptop.laptopName} className="laptops-page__image" />

                    <div className="laptops-page__condition">{laptop.laptopCondition}</div>

                    {!inStock && (
                      <div className="laptops-page__out-of-stock">
                        <Typography className="laptops-page__out-of-stock-text">
                          Out of Stock
                        </Typography>
                      </div>
                    )}

                  </div>

                  <div className="laptops-page__card-body">
                    <div>
                      <Typography className="laptops-page__card-title">{laptop.laptopName}</Typography>

                      <div className="laptops-page__spec-tags">
                        <div className="laptops-page__spec-tag">{laptop.laptopRam} GB</div>
                        <div className="laptops-page__spec-tag">{laptop.laptopStorage} GB</div>
                      </div>

                      <div className="laptops-page__views">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <Typography className="laptops-page__views-count">
                          {laptop.laptopViews.toLocaleString()}
                        </Typography>
                      </div>
                    </div>

                    <div className="laptops-page__price-row">
                      <Typography className="laptops-page__price">
                        ${laptop.laptopPrice.toLocaleString()}
                      </Typography>
                      <div
                        onClick={(e) => {
                          if (inStock) addToCart(e, laptop);
                        }}
                        className={cartClass}
                      >
                        {isAdded ? (
                          <svg className="laptops-page__cart-icon" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg className="laptops-page__cart-icon" viewBox="0 0 24 24" strokeLinecap="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                        )}
                        <Box component="span" className="laptops-page__cart-label">
                          {isAdded ? "Added!" : "Cart"}
                        </Box>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="laptops-page__pagination">
          <Pagination
            count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
            page={productSearch.page}
            renderItem={(item) => (
              <PaginationItem components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
            )}
            onChange={paginationHandler}
          />
        </div>
      </Container>
    </section>
  );
}
