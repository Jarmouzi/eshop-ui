export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'مرتبط ترین',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'پرفروش ترین', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'جدیدترین', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: false },
  { title: 'ارزانترین', slug: 'price-asc', sortKey: 'PRICE', reverse: true }, // asc
  { title: 'گران ترین', slug: 'price-desc', sortKey: 'PRICE', reverse: false }
];

export const TAGS = {
  collections: 'گروهبندیها',
  products: 'محصولات',
  cart: 'سبد خرید'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'عنوان پیش فرض';
//export const GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';
