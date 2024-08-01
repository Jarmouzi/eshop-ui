import { Product } from "./Product";

export type ListBox = {
    id: string;
    quantity: number;
    cost: {
      totalAmount: number;// Money;
    };
    merchandise: {
      id: string;
      title: string;
      selectedOptions: {
        name: string;
        value: string;
      }[];
      product: Product;
    };
  };