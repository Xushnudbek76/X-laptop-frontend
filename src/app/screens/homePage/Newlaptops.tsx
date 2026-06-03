import { Box, Container, Typography, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BoltIcon from "@mui/icons-material/Bolt";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveNewLaptops } from "./selector";
import { useSelector } from "react-redux";
import type { Item } from "../../../lib/types/item";
import { serverApi } from "../../../lib/config";
import type { CartItem } from "../../../lib/types/cart";
import { useNavigate } from "react-router-dom";

const NewLaptopsRetriever = createSelector(retrieveNewLaptops, (newLaptops) => ({ newLaptops }));

interface NewLaptopCardProps {
  laptop: Item;
  handleAddToCart: (item: CartItem) => void;
}

function NewLaptopCard({ laptop, handleAddToCart }: NewLaptopCardProps) {
  const image = `${serverApi}/${laptop.laptopImages[0]}`;
  const navigate = useNavigate();
  const conditionClass =
    laptop.laptopCondition === "NEW"
      ? "home-laptop-card__rating home-laptop-card__rating--status home-laptop-card__rating--new"
      : "home-laptop-card__rating home-laptop-card__rating--status home-laptop-card__rating--used";

  return (
    <div className="home-laptop-card" onClick={() => navigate(`/laptops/${laptop._id}`)}>
      <div className="home-laptop-card__visual">
        <img src={image} alt={laptop.laptopName} className="home-laptop-card__image" />
        <div className="home-laptop-card__overlay" />

        <div className="home-laptop-card__badge">{laptop.laptopCategory}</div>
        <div className={conditionClass}>{laptop.laptopCondition}</div>

        <div className="home-laptop-card__visual-footer">
          <Typography className="home-laptop-card__price">
            ${laptop.laptopPrice.toLocaleString()}
          </Typography>
          <div className="home-laptop-card__views">
            <Typography className="home-laptop-card__views-text">{laptop.laptopViews}</Typography>
            <VisibilityIcon className="home-laptop-card__views-icon" />
          </div>
        </div>
      </div>

      <div className="home-laptop-card__body">
        <div className="home-laptop-card__copy">
          <div className="home-laptop-card__header-row">
            <Typography className="home-laptop-card__name">{laptop.laptopName}</Typography>
            <div className="home-laptop-card__brand-tag">{laptop.laptopBrand}</div>
          </div>
          <div className="home-laptop-card__specs">
            <BoltIcon />
            <Typography component="span">
              {laptop.laptopCpu} · {laptop.laptopRam} GB · {laptop.laptopStorage} GB
            </Typography>
          </div>
        </div>

        <IconButton
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            handleAddToCart({ ...laptop, quantity: 1 });
          }}
          className="home-laptop-card__action"
        >
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}

interface NewLaptopsProps {
  handleAddToCart: (item: CartItem) => void;
}

export default function NewLaptops(props: NewLaptopsProps) {
  const { newLaptops } = useSelector(NewLaptopsRetriever);
  const { handleAddToCart } = props;

  return (
    <section className="new-laptops">
      <Container maxWidth="lg" className="home-section__container">
        <div className="home-section__header">
          <Typography className="home-section__kicker">Just Arrived</Typography>
          <Typography className="home-section__title">New Laptops</Typography>
        </div>

        {newLaptops.length !== 0 ? (
          <div className="home-laptop-grid">
            {newLaptops.map((laptop: Item) => (
              <div key={laptop._id} className="home-laptop-grid__item">
                <NewLaptopCard laptop={laptop} handleAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        ) : (
          <Box className="home-section__empty">No new laptops available</Box>
        )}
      </Container>
    </section>
  );
}
