import { Product } from "./Product";

export type Cart = {
    Id: string;
    CheckoutUrl: string;
    Amount: number;
    TaxAmount: number;
    DiscountAmount: number;
    TotalAmount: number;
    DiscountCode: string;
    Items: CartItem[];
    Quantity: number;
  };

  export type CartItem = {
    Id: number;
    Amount: number;
    DiscountAmount: number;
    Quantity: number;
    ProductVariant: {
      Id: number;
      //Title: string;
      SelectedOptions: {
        OptionId: string; //name: string;
        OptionValueId: string; //value: string;
      }[];
      Product: Product;
    };
    // ProductVariantId: string;
    // ProductHandle: string;
    // ProductUrl: string;
  };