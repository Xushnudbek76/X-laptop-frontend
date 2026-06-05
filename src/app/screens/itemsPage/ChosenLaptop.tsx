import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Rating,
  Chip,
  Divider,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation } from "swiper/modules";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import type { CartItem } from "../../../lib/types/cart";
import type { Item } from "../../../lib/types/item";
import { LaptopStatus } from "../../../lib/enums/item.enum";
import ItemService from "../../services/ProductService";
import { resolveAssetUrl } from "../../../lib/config";

const itemService = new ItemService();

interface ItemProps {
  handleAddToCart: (product: CartItem) => void;
}

export default function ChosenLaptop(props: ItemProps) {
  const { handleAddToCart } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const { laptopId } = useParams<{ laptopId: string }>();
  const [cartAdded, setCartAdded] = useState<string[]>([]);

  useEffect(() => {
    if (!laptopId) return;
    itemService
      .getItem(laptopId)
      .then((data) => setItem(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [laptopId]);

  if (loading) {
    return (
      <div className="laptops-page__loader">
        <CircularProgress />
      </div>
    );
  }

  if (!item) {
    return <div className="laptops-page__not-found">Product not found.</div>;
  }

  const specs = [
    { label: "Processor", value: item.laptopCpu },
    { label: "RAM", value: item.laptopRam },
    { label: "Storage", value: item.laptopStorage },
    { label: "Display", value: `${item.laptopDisplaySize}"` },
    { label: "GPU", value: item.laptopGpu ?? "Integrated" },
    { label: "Category", value: item.laptopCategory },
  ];

  const inStock = item.laptopStatus === LaptopStatus.PROCESS && item.laptopLeftCount > 0;
  const images =
    item.laptopImages.length > 0
      ? item.laptopImages
      : ["https://via.placeholder.com/600x400?text=No+Image"];
  const isAdded = cartAdded.includes(item._id);

  const addToCart = (e: React.MouseEvent, laptop: Item) => {
    e.stopPropagation();
    handleAddToCart(laptop as unknown as CartItem);
    setCartAdded((prev) => (prev.includes(laptop._id) ? prev : [...prev, laptop._id]));
  };

  return (
    <section className="laptops-page__detail">
      <Typography className="laptops-page__detail-title">Product Detail</Typography>

      <Container maxWidth="lg">
        <div className="laptops-page__detail-body">
          <div className="chosen-laptop__gallery">
            <div className="chosen-laptop__slider">
              <Swiper
                loop={false}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation]}
                onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              >
                {images.map((src, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      component="img"
                      src={resolveAssetUrl(src)}
                      alt={`${item.laptopName}-${index}`}
                      className="chosen-laptop__main-image"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="chosen-laptop__thumbs">
              <Swiper spaceBetween={8} slidesPerView={3} freeMode={true} modules={[FreeMode]}>
                {images.map((src, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => {
                      mainSwiperRef.current?.slideTo(index);
                      setActiveIndex(index);
                    }}
                  >
                    <Box
                      component="img"
                      src={resolveAssetUrl(src)}
                      alt={`thumb-${index}`}
                      className={`chosen-laptop__thumb${activeIndex === index ? " is-active" : ""}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="chosen-laptop__panel">
            <div className="chosen-laptop__chips">
              <Chip label={item.laptopBrand} size="small" className="chosen-laptop__chip chosen-laptop__chip--brand" />
              <Chip
                label={item.laptopCondition}
                size="small"
                className="chosen-laptop__chip chosen-laptop__chip--condition"
              />
              <Chip
                label={inStock ? "In Stock" : "Out of Stock"}
                size="small"
                icon={<span className="chosen-laptop__stock-dot" />}
                className={`chosen-laptop__chip chosen-laptop__chip--stock ${inStock ? "is-in-stock" : "is-out-of-stock"}`}
              />
            </div>

            <div className="chosen-laptop__sku">
              SKU: {item.laptopBrand.slice(0, 3).toUpperCase()}-
              {item.laptopCategory.slice(0, 3).toUpperCase()} — ID: {item._id}
            </div>

            <Typography className="chosen-laptop__name">{item.laptopName}</Typography>

            <div className="chosen-laptop__rating-row">
              <Rating defaultValue={4.2} precision={0.5} readOnly className="chosen-laptop__rating" />
              <div className="chosen-laptop__views">
                <RemoveRedEyeIcon className="chosen-laptop__views-icon" />
                <span>{item.laptopViews}</span>
              </div>
            </div>

            <div className="chosen-laptop__spec-grid">
              {specs.map((spec) => (
                <div key={spec.label} className="chosen-laptop__spec-card">
                  <div className="chosen-laptop__spec-label">{spec.label}</div>
                  <div className="chosen-laptop__spec-value">{spec.value}</div>
                </div>
              ))}
            </div>

            {item.laptopDesc && <Typography className="chosen-laptop__description">{item.laptopDesc}</Typography>}

            <Divider className="chosen-laptop__divider" />

            <div className="chosen-laptop__price-row">
              <Typography className="chosen-laptop__price">${item.laptopPrice.toLocaleString()}</Typography>
              {item.laptopLeftCount <= 5 && item.laptopLeftCount > 0 && (
                <Typography className="chosen-laptop__stock-note">
                  Only {item.laptopLeftCount} left
                </Typography>
              )}
            </div>

            <div className="chosen-laptop__actions">
              <Button
                variant="contained"
                disabled={!inStock || isAdded}
                startIcon={<ShoppingBasketIcon />}
                onClick={(e) => {
                  if (inStock) addToCart(e, item);
                }}
                className={`chosen-laptop__primary${isAdded ? " is-added" : ""}`}
              >
                {isAdded ? "Added to Basket" : "Add to Basket"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
