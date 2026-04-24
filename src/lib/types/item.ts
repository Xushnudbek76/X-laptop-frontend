import {
  LaptopBrand,
  LaptopCategory,
  LaptopCondition,
  LaptopRam,
  LaptopStatus,
  LaptopStorage,
} from "../enums/item.enum";

export interface Item {
  _id: string;
  laptopStatus: LaptopStatus;
  laptopBrand: LaptopBrand;
  laptopCategory: LaptopCategory;
  laptopCondition: LaptopCondition;
  laptopName: string;
  laptopPrice: number;
  laptopLeftCount: number;
  laptopRam: LaptopRam;
  laptopStorage: LaptopStorage;
  laptopCpu: string;
  laptopGpu?: string | null;
  laptopDisplaySize: number;
  laptopDesc?: string | null;
  laptopImages: string[];
  laptopViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productBrand?: LaptopBrand;
  laptopCategory?: LaptopCategory;
  laptopRam?: LaptopRam;
  laptopStorage?: LaptopStorage;
  search?: string;
}
