export type UserProfile = {
  Id: number;
  UserId: string;
  Name: string | "";
  Family: string | "";
  NationalCode: number | null;
  PhoneNumber: number | null;
  Email: string | "";
  ModifiedBy: string | "";
};
