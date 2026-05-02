import { createSelector } from "@reduxjs/toolkit";
import type { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveTopLaptops = createSelector(selectHomePage, (homePage) => homePage.topLaptops);

export const retrieveNewLaptops = createSelector(selectHomePage, (homePage) => homePage.newLaptops);

export const retrieveTopUsers = createSelector(selectHomePage, (homePage) => homePage.topUsers);
