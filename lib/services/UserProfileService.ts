import { UserProfile } from "../types/UserProfile";
import { AuthGetData, PutData } from "./service";

export async function createUserProfile(): Promise<UserProfile> {
  const res = await AuthGetData<UserProfile>({
    path: "UserProfile/Add",
    cache: "no-store",
  });
  return res.body; //return reshapeUserProfile(res.body.data.UserProfileCreate.UserProfile);
}

export async function addToUserProfile(
  UserProfileId: string,
  productVariantId: string,
  quantity: number
): Promise<UserProfile> {
  const res = await AuthGetData<UserProfile>({
    path: `UserProfile/AddToUserProfile?json=${JSON.stringify({ id: UserProfileId, pv: productVariantId, q: quantity })}`,
    cache: "no-store",
  });

  return res.body; // return reshapeUserProfile(res.body.data.UserProfileLinesAdd.UserProfile);
}

export async function removeFromUserProfile(
  UserProfileId: string,
  cardItemId: number
): Promise<UserProfile> {
  const res = await AuthGetData<UserProfile>({
    path: `UserProfile/RemoveFromUserProfile?json=${JSON.stringify({ id: UserProfileId, ci: cardItemId })}`,
    cache: "no-store",
  });

  return res.body; //return reshapeUserProfile(res.body.data.UserProfileLinesRemove.UserProfile);
}

export async function updateUserProfile(
  data: UserProfile
): Promise<UserProfile> {
  const res = await PutData<UserProfile>({
    path: "UserProfile/Update",
    model: data,
  });

  return res.body; //return reshapeUserProfile(res.body.data.UserProfileLinesUpdate.UserProfile);
}

export async function getUserProfile(): Promise<UserProfile> {
  const res = await AuthGetData<UserProfile>({
    path: `UserProfile/Get`,
  });

  // Old UserProfiles becomes `null` when you checkout.
  if (!res.body) {
    return {} as UserProfile;
    // {
    //   Id: 0,
    //   Username: "",
    //   Name: "",
    //   Family: "",
    //   NationalCode: null,
    //   PhoneNumber: null,
    //   Email: "",
    // };
  }

  return res.body; //return reshapeUserProfile(res.body.data.UserProfile);
}
