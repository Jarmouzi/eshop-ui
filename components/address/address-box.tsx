'use client'
import { UserAddress } from "@/lib/types/UserAddress";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider, Radio } from "@nextui-org/react";

import UpdateAddressModal from "./update-modal";
import { SelectItem } from "@/lib/types/SelectItem";
import { City } from "@/lib/types/City";

export default function AddressBox({userAddress, states, cities} :{userAddress: UserAddress, states: SelectItem[], cities: City[]}){

    return (         
        <Card shadow="sm" className="min-h-52">
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
            <h3> {userAddress.Address} </h3>
            <br/>
            {userAddress.Number ? (<><h3>پلاک: </h3> <h4>{userAddress.Number}</h4></>) : null}
            {userAddress.Unit ? (<><h3>واحد: </h3> <h4>{userAddress.Unit}</h4></>) : null}
            <h3>کد پستی: </h3> <h4>{userAddress.PostalCode}</h4>
            {userAddress.ReceiverName == null ? (
                <h3>گیرنده خودم هستم</h3>
            ): 
            (
                <>
                    <h3>نام و نام خانوادگی گیرنده: </h3> <h4>{userAddress.ReceiverName}</h4>
                    <h3>شماره تماس گیرنده: </h3> <h4>{userAddress.ReceiverPhoneNumber}</h4>
                </>
            )}
          </CardBody>
        </Card>
    );
}