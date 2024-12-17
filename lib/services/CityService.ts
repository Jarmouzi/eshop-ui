import { City } from "../types/City";
import { SelectItem } from "../types/SelectItem";
import { GetData, PostData } from "./service";

export async function getCity(id: string): Promise<City> {
  const res = await GetData<City>({
    path: "City/Get?" + id,
  });

  return res.body;
}
export async function getAllCities(): Promise<City[]> {
  const res = await GetData<City[]>({
    path: "City/GetAll",
  });

  return res.body;
}
export async function getCities(stateId: string | null): Promise<SelectItem[]> {
  const res = await PostData<SelectItem[]>({
    path: `City/GetFiltered?sId=${stateId}`,
  });

  return res.body;
}

export function getFilteredCities(
  cities: City[],
  stateId: number | null
): SelectItem[] {
  if (stateId) {
    return cities
      .filter((city) => city.StateId === stateId)
      .map(
        (city) =>
          ({
            Id: city.Id,
            Title: city.Title,
          }) as unknown as SelectItem
      );
  }
  return cities.map(
    (city) =>
      ({
        Id: city.Id,
        Title: city.Title,
      }) as unknown as SelectItem
  );
}
