type Filter = {
  FeatureId: string | null;
  CategoryId: string | null;
  ComponentName: string | null;
  Confirmed: boolean | null;
  Title: string | null;
};

export type FilterItem = {
  Id: string;
  Path: string | "#";
  Title: string;
};
