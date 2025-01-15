export type PaymentGateway = {
  id: number;
  title: string | null;
  description: string | null;
  url: string | null;
  isPublic: boolean | null;
};
