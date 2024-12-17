
import { UserAddress } from "@/lib/types/UserAddress";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import { startTransition } from "react";
import AddressBox from "./address-box";
import InsertAddressModal from "./insert-modal";
import { SelectItem } from "@/lib/types/SelectItem";
import { City } from "@/lib/types/City";

export default function Address({userAddresses, states, cities} :{userAddresses: UserAddress[], states: SelectItem[], cities: City[]}){

  return (     
    <Card shadow="sm" className="min-h-[70vh]">
      <CardHeader className="font-semibold">
        آدرس ها ی شما
      </CardHeader>    
      <Divider/>
      <CardBody>
      { userAddresses?.length > 0 ?  (
        <>
          {userAddresses.map((address, i) => (
            <AddressBox userAddress={address} key={i} states={states} cities={cities}/>
          ))}
        </>
      ): null}
      <InsertAddressModal states={states} cities={cities} />
      </CardBody>
    </Card>
  );
}