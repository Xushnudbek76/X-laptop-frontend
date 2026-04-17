import type { Dispatch } from "@reduxjs/toolkit";
import CompanyVideo from "./CompanyVideo";
import MostPopular from "./MostPopular";
import News from "./New";
import NewLaptops from "./Newlaptops";
import ActiveUsers from "./TopUsers";
import { setTopLaptops } from "./slice";
import type { Item } from "../../../lib/types/item";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


const actionDispatch = (dispatch: Dispatch) => ({
    setTopLaptops: (data: Item[]) => dispatch(setTopLaptops(data)),
})
export default function  HomePage() {
    const {setTopLaptops} = actionDispatch(useDispatch());

    useEffect(() => {

    }, [])
    return <div className="homepage">
        <MostPopular />
        <NewLaptops />
        <CompanyVideo/>
        <ActiveUsers/>
        <News/>
    </div>
}