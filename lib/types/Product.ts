export type SimpleProduct = {
  id: string;
  v: number;
  availableForSale: boolean;
  title: string;
  price: number;
  featuredImage: string;
};

export type Product = {
  id: string;
  availableForSale: boolean;
  title: string;
  title_En: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  features: ProductFeature[];
  price: number;
  variants: ProductVariant[];
  featuredImage: Image;
  images: Image[];
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ProductFeature = {
  id: string;
  title: string;
  //Icon: string;
  features: Feature[];
};

export type Feature = {
  id: string;
  title: string;
  //Icon: string;
  value: string;
};

export type ProductOption = {
  id: string;
  title: string;
  values: OptionValue[];
};

export type OptionValue = {
  id: string;
  title: string;
  image: Image;
  color: string;
};

export type ProductVariant = {
  id: string;
  //Title: string;
  availableForSale: boolean;
  selectedOptions: {
    optionId: string; //Title: string;
    optionValueId: string; //Value: string;
  }[];
  price: number;
};

export type SEO = {
  title: string;
  description: string;
  isName: boolean;
};
export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

// export type Money = {
//   amount: string;
//   currencyCode: string;
// };
