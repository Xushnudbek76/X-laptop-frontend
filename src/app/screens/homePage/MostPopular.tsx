import { Box, Container, Typography, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveTopLaptops } from "./selector";
import type { Item } from "../../../lib/types/item";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import type { CartItem } from "../../../lib/types/cart";
import { useNavigate } from "react-router-dom";

const MostSoldLaptopsRetriever = createSelector(retrieveTopLaptops, (topLaptops) => ({
  topLaptops,
}));

interface LaptopCardProps {
  item: Item;
  handleAddToCart: (item: CartItem) => void;
}

function LaptopCard({ item, handleAddToCart }: LaptopCardProps) {
  const image = `${serverApi}/${item.laptopImages[0]}`;
  const navigate = useNavigate();

  return (
    <div className="home-laptop-card" onClick={() => navigate(`/laptops/${item._id}`)}>
      <div className="home-laptop-card__visual">
        <img src={image} alt={item.laptopName} className="home-laptop-card__image" />
        <div className="home-laptop-card__overlay" />

        <div className="home-laptop-card__badge">{item.laptopBrand}</div>

        <div className="home-laptop-card__rating">
          <StarIcon />
          {item.laptopViews > 100 ? "4.8" : "4.5"}
        </div>

        <div className="home-laptop-card__visual-footer">
          <Typography className="home-laptop-card__visual-title">{item.laptopName}</Typography>
          <div className="home-laptop-card__views">
            <Typography className="home-laptop-card__views-text">{item.laptopViews}</Typography>
            <VisibilityIcon className="home-laptop-card__views-icon" />
          </div>
        </div>
      </div>

      <div className="home-laptop-card__body">
        <div className="home-laptop-card__meta">
          <div className="home-laptop-card__dot" />
          <div className="home-laptop-card__copy">
            <Typography className="home-laptop-card__name">{item.laptopName}</Typography>
            <Typography className="home-laptop-card__desc">{item.laptopDesc}</Typography>
          </div>
        </div>

        <div className="home-laptop-card__price-row">
          <Typography className="home-laptop-card__price">
            ${item.laptopPrice.toLocaleString()}
          </Typography>
          <IconButton
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              handleAddToCart({ ...item, quantity: 1 });
            }}
            className="home-laptop-card__action"
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

interface MostPopularProps {
  handleAddToCart: (item: CartItem) => void;
}

export default function MostSelled(props: MostPopularProps) {
  const { topLaptops } = useSelector(MostSoldLaptopsRetriever);
  const { handleAddToCart } = props;

  return (
    <section className="most-popular">
      <Container maxWidth="lg" className="home-section__container">
        <div className="home-section__header">
          <Typography className="home-section__kicker">Top Picks</Typography>
          <Typography className="home-section__title">Most Sold Laptops</Typography>
        </div>

        {topLaptops.length !== 0 ? (
          <div className="home-laptop-grid">
            {topLaptops.map((item: Item) => (
              <div key={item._id} className="home-laptop-grid__item">
                <LaptopCard item={item} handleAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        ) : (
          <Box className="home-section__empty">No laptops found</Box>
        )}
      </Container>
    </section>
  );
}
