export type UserAddress = {
  Id: number;
  UserId: string;
  StateId: number;
  CityId: number;
  Title: string | null;
  Address: string | null;
  // StateTitle: string | null;
  // CityTitle: string | null;
  ReceiverPhoneNumber: string | null;
  ReceiverName: string | null;
  Number: number | null;
  Unit: string | null;
  PostalCode: string | null;
  IsDefault: boolean | null;
  Latitude: number | null;
  Longtitude: number | null;
  ModifiedBy: string | "";
};
