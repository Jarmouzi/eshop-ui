export type UserAddress = {
  id: number;
  userId: string;
  stateId: number | null;
  cityId: number | null;
  title: string | "";
  address: string | "";
  // StateTitle: string | null;
  // CityTitle: string | null;
  receiverPhoneNumber: string | null;
  receiverName: string | null;
  number: number | null;
  unit: string | "";
  postalCode: string | "";
  isDefault: boolean | false;
  latitude: number | null;
  longtitude: number | null;
  modifiedBy: string | "";
};
