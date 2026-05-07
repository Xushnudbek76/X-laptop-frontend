import type { Dispatch } from "@reduxjs/toolkit";
import CompanyVideo from "./CompanyVideo";
import MostPopular from "./MostPopular";
import News from "./New";
import NewLaptops from "./Newlaptops";
import ActiveUsers from "./TopUsers";
import { setNewLaptops, setTopLaptops, setTopUsers } from "./slice";
import type { Item } from "../../../lib/types/item";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { Member } from "../../../lib/types/member";
import ItemService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import type { CartItem } from "../../../lib/types/cart";

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

const actionDispatch = (dispatch: Dispatch) => ({
  setTopLaptops: (data: Item[]) => dispatch(setTopLaptops(data)),
  setNewLaptops: (data: Item[]) => dispatch(setNewLaptops(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});
export default function HomePage(props: HomePageProps) {
  const { onAdd } = props;
  const { setTopLaptops, setNewLaptops, setTopUsers } = actionDispatch(useDispatch());

  useEffect(() => {
    const item = new ItemService();
    item
      .getItems({
        page: 1,
        limit: 4,
        order: "productViews",
      })
      .then((data) => {
        setTopLaptops(data);
      })
      .catch((err) => console.log(err));

    item
      .getItems({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => {
        setNewLaptops(data);
      });

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, [setNewLaptops, setTopLaptops, setTopUsers]);
  return (
    <div className="homepage">
      <MostPopular handleAddToCart={onAdd} />
      <NewLaptops handleAddToCart={onAdd} />
      <CompanyVideo />
      <ActiveUsers />
      <News />
    </div>
  );
}
