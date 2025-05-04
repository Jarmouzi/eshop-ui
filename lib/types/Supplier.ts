export type Supplier = {
  id: number;
  title: string;
  ownerId: string | null;
  address: string | null;
  signe: string;
  phoneNumber: string | null;
  faxNumber: string | null;
  logo: string;
  banner: string;
  confirmed: boolean | null;
};
