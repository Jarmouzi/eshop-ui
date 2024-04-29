  export type SimpleProduct = {
    Id: string;
    AvailableForSale: boolean;
    Title: string;
    Price: number,
    FeaturedImage: string;
  };

  export type Product = {
    Id: string;
    AvailableForSale: boolean;
    Title: string;
    Description: string;
    DescriptionHtml: string;
    Options: ProductOption[];
    Features: ProductFeature[];
    Price: number;
    Variants: ProductVariant[];
    FeaturedImage: Image;
    Images: Image[];
    Seo: SEO;
    Tags: string[];
    UpdatedAt: string;
  };

  export type ProductFeature = {
    Id: string;
    Title: string;
    Value: string;
  };

  export type ProductOption = {
    Id: string;
    Title: string;
    Values: OptionValue[];
  };

  export type OptionValue = {
    Id: string;
    Title: string;
    Image: Image;
    Color: string;
  };
  
  export type ProductVariant = {
    Id: string;
    Title: string;
    AvailableForSale: boolean;
    SelectedOptions: {
      OptionId: string; //Title: string;
      OptionValueId: string; //Value: string;
    }[];
    Price: number;
  };
  
  export type SEO = {
    Title: string;
    Description: string;
    IsName: boolean;
  };
  export type Image = {
    Url: string;
    AltText: string;
    Width: number;
    Height: number;
  };
  
  // export type Money = {
  //   amount: string;
  //   currencyCode: string;
  // };