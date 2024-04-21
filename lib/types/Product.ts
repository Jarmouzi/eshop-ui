  export type SimpleProduct = {
    Id: string;
    AvailableForSale: boolean;
    Title: string;
    Price: number,
    FeaturedImage: string;
  };

  export type Product = {
    id: string;
    availableForSale: boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: ProductOption[];
    price: number;
    variants: ProductVariant[];
    featuredImage: Image;
    images: Image[];
    seo: SEO;
    tags: string[];
    updatedAt: string;
  };

  export type ProductOption = {
    id: string;
    name: string;
    values: string[];
  };
  
  export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    price: Money;
  };
  
  export type SEO = {
    title: string;
    description: string;
  };
  export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  
  export type Money = {
    amount: string;
    currencyCode: string;
  };