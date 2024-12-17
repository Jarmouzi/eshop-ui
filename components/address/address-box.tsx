'use client'
import { UserAddress } from "@/lib/types/UserAddress";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider, Radio } from "@nextui-org/react";

import UpdateAddressModal from "./update-modal";
import { SelectItem } from "@/lib/types/SelectItem";
import { City } from "@/lib/types/City";

export default function AddressBox({userAddress, states, cities} :{userAddress: UserAddress, states: SelectItem[], cities: City[]}){

    return (         
        <Card shadow="sm" className="min-h-[70vh]">
          <CardHeader className="font-semibold">
            <Radio value={`آدرس ${userAddress.Title}`} ></Radio>
            <div className="absolute right-0 mr-4">
                <UpdateAddressModal address={userAddress} states={states} cities={cities}/>
                {/* <form onSubmit={handleSubmit}>
                    <button type="submit" >
                        <PencilIcon />
                    </button>
                </form> */}
            </div>
          </CardHeader>      
          <Divider/>
          <CardBody>

          </CardBody>
        </Card>
    );
}