'use client'
import { UserAddress } from "@/lib/types/UserAddress";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider, Radio } from "@nextui-org/react";

import UpdateAddressModal from "./update-modal";
import { SelectItem } from "@/lib/types/SelectItem";
import { City } from "@/lib/types/City";
import { CheckIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function AddressBox({userAddress, states, cities} :{userAddress: UserAddress, states: SelectItem[], cities: City[]}){

    return (         
        <Card shadow="sm" className="min-h-48 mb-2">
          <CardHeader className="font-semibold">
            { userAddress.isDefault ? <CheckCircleIcon className="h-8 right-2 pl-4 text-teal-500" /> : null }
            <h3> {`آدرس ${userAddress.title ? userAddress.title : ""}`}  </h3>
            <div className="absolute left-2 ml-4">
                <UpdateAddressModal address={userAddress} states={states} cities={cities} />
                {/* <form onSubmit={handleSubmit}>
                    <button type="submit" >
                        <PencilIcon />
                    </button>
                </form> */}
            </div>
          </CardHeader>      
          <Divider/>
          <CardBody className="text-right leading-9">
            <p> 
                {userAddress.stateId ? (<b> {states.filter((state) => Number(state.id) === userAddress.stateId).map((state) => (state.title))}, </b>) : null} 
                {userAddress.cityId ? (<b> {cities.filter((city) => Number(city.id) === userAddress.cityId).map((city) => (city.title))}, </b>) : null} 
                {userAddress.address} 
            </p>      
            <p>     
                {userAddress.number ? (<span className="pl-4"><b>پلاک: </b>{userAddress.number}</span>) : null}
                {userAddress.unit ? (<span className="pl-4"><b>واحد: </b>{userAddress.unit}</span>) : null}
                <span><b>کد پستی: </b>{userAddress.postalCode}</span>
            </p> 
            {userAddress.receiverName == null ? (
                <p><b>گیرنده خودم هستم</b></p>
            ): 
            (
                <p>
                    <span className="pl-4"><b> نام و نام خانوادگی گیرنده: </b> {userAddress.receiverName} </span> 
                    <span><b> شماره تماس گیرنده: </b> {userAddress.receiverPhoneNumber} </span>
                </p>
            )}

          </CardBody>
        </Card>
    );
}