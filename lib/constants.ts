import { SimpleMenu } from "./types/Menu";

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "مرتبط ترین",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "پرفروش ترین",
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  }, // asc
  {
    title: "جدیدترین",
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: false,
  },
  { title: "ارزانترین", slug: "price-asc", sortKey: "PRICE", reverse: true }, // asc
  { title: "گران ترین", slug: "price-desc", sortKey: "PRICE", reverse: false },
];

export const TAGS = {
  collections: "گروهبندیها",
  products: "محصولات",
  cart: "سبد خرید",
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "عنوان پیش فرض";
//export const GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';

export const UserMenuData: SimpleMenu[] = [
  {
    Id: "1",
    Title: "پروفایل",
    PageAddress: "/profile",
    Content: null,
  },
  {
    Id: "5",
    Title: "آدرس ها",
    PageAddress: "/address",
    Content: null,
  },
  {
    Id: "2",
    Title: "سوابق خرید",
    PageAddress: "/orders",
    Content: null,
  },
  {
    Id: "3",
    Title: "پیام ها",
    PageAddress: "/message",
    Content: null,
  },
  {
    Id: "4",
    Title: "پشتیبانی",
    PageAddress: "/support",
    Content: null,
  },
];

export const HelpMenuData: SimpleMenu[] = [
  {
    Id: "1",
    Title: "خرید نقدی",
    PageAddress: "/help/cash",
    Content: null,
  },
  {
    Id: "2",
    Title: "خرید اقساطی",
    PageAddress: "/help/credit",
    Content: null,
  },
  {
    Id: "3",
    Title: "شرایط ویژه فرهنگیان",
    PageAddress: "/help/etma",
    Content: null,
  },
  {
    Id: "4",
    Title: "شرایط ویژه بیمه شدگان تامین اجتماعی",
    PageAddress: "/help/keepa",
    Content: null,
  },
  {
    Id: "5",
    Title: "سوالات متداول",
    PageAddress: "/help/faq",
    Content: null,
  },
];
