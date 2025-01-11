import {RadioGroup, Radio, cn} from "@nextui-org/react";
import InsertAddressModal from "./insert-modal";
import { UserAddress } from "@/lib/types/UserAddress";
import { SelectItem } from "@/lib/types/SelectItem";
import { City } from "@/lib/types/City";


export default function AddressList({addresses, states, cities} :{addresses: UserAddress[], states: SelectItem[], cities: City[]}) {

  return (
    <div className="">
      <RadioGroup description="Selected plan can be changed at any time." label="Plans">
        {addresses && addresses.map((address, i) => (
          <Radio description={address.address} value={address.id.toString()} key={address.id}>
            {address.title}
          </Radio>
        ))}
      </RadioGroup>
      <InsertAddressModal states={states} cities={cities} />
    </div>
  );
}
