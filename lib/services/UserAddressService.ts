import { json } from "stream/consumers";
import { UserAddress } from "../types/UserAddress";
import { GetData, PostData, PostDataModel, PutData } from "./service";

export async function createUserAddress(
  data: UserAddress
): Promise<UserAddress> {
  const res = await PostDataModel<UserAddress>({
    path: "UserAddress/Add",
    model: data,
  });
  return res.body; //return reshapeUserAddress(res.body.data.UserAddressCreate.UserAddress);
}

export async function updateUserAddress(
  data: UserAddress
): Promise<UserAddress> {
  const res = await PutData<UserAddress>({
    path: "UserAddress/Update",
    model: data,
  });

  return res.body; //return reshapeUserAddress(res.body.data.UserAddressLinesUpdate.UserAddress);
}

export async function deleteUserAddress(
  UserAddressId: string,
  cardItemId: number
): Promise<UserAddress> {
  const res = await GetData<UserAddress>({
    path: `UserAddress/Delete?json=${JSON.stringify({ id: UserAddressId, ci: cardItemId })}`,
    cache: "no-store",
  });

  return res.body; //return reshapeUserAddress(res.body.data.UserAddressLinesRemove.UserAddress);
}

export async function getUserAddress(id: string): Promise<UserAddress> {
  const res = await GetData<UserAddress>({
    path: "UserAddress/Get?" + id,
  });

  return res.body;
}
export async function getUserAddresses(): Promise<UserAddress[]> {
  const res = await GetData<UserAddress[]>({
    path: "UserAddress/GetAll",
  });

  return res.body;
}
export async function getUserAddresss(jp: string): Promise<UserAddress[]> {
  const res = await PostData<UserAddress[]>({
    path: "UserAddress/GetFiltered",
    variables: jp,
  });

  return res.body;
}
