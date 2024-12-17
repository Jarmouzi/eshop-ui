import { Checkbox, Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import { UserAddress } from '@/lib/types/UserAddress';
import { PencilIcon } from '@heroicons/react/24/outline';
import CloseAddress from './close-address';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider, Dropdown } from '@nextui-org/react';
import { updateUserAddress } from '@/lib/services/UserAddressService';
import SingleSelectDropDown from '../dropdown/singleSelectDropDown';
import { getAllStates } from '@/lib/services/StateService';
import { getCities, getFilteredCities } from '@/lib/services/CityService';
import { SelectItem } from '@/lib/types/SelectItem';
import { City } from '@/lib/types/City';

type ProductVariantSearchParams = {
  [key: string]: string;
};

export default function AddressForm({ address, submit, states, cities }: { address: UserAddress, submit: (formData: UserAddress) => void, states: SelectItem[], cities: City[]  }) {
    //const states = await getAllStates()
    const [filteredCities, setFilteredCities] = useState(getFilteredCities(cities, address?.StateId))

    const [ReceiverIsMe, setReceiverIsMe] = useState(false);
  const [formData, setFormData] = useState(address);

  const handleCheckboxChange = () => {
      setReceiverIsMe(prev => !prev);
  };
  const handleStateChange = (key: string) => {
    setFilteredCities(getFilteredCities(cities, Number(key)));
  }
  const handleCityChange = (key: string) => {
    setFormData({ ...formData, ["CityId"]: key as unknown as number });
  }
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      submit(formData);
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className="gap-2 grid grid-cols-3 grid-rows-2 w-full text-right">
            <div className="mb-4 col-span-3 sm:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Title">
                عنوان آدرس
                </label>
                <input id="Title" name="Title" type="number" placeholder='مثال: خانه' value={address.Title || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-4 col-span-3 sm:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PhoneNumber">
                استان
                </label>
                <SingleSelectDropDown  list={states} selectedKey={String(address.StateId)} onSelectionChange={handleStateChange} />
            </div>
            <div className="mb-4 col-span-3 sm:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                شهر
                </label>
                <SingleSelectDropDown  list={filteredCities} selectedKey={String(address.CityId)} onSelectionChange={handleCityChange} />
            </div>
            <div className="mb-4 col-span-1" >
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Address">
                آدرس
                </label>
                <input id="Address" name="Address" type="text" value={address.Address || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-4 col-span-3 sm:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Number">
                پلاک
                </label>
                <input id="Number" name="Number" type="number" value={address?.Number || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>                
            <div className="mb-4 col-span-3 sm:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Unit">
                واحد
                </label>
                <input id="Unit" name="Unit" type="number" value={address?.Unit || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>                
            <div className="mb-4 col-span-3 sm:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PostalCode">
                کد پستی
                </label>
                <input id="PostalCode" name="PostalCode" type="number" value={address?.PostalCode || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-4 col-span-1">
                <Checkbox checked={ReceiverIsMe} onChange={handleCheckboxChange} >گیرنده خودم هستم</Checkbox>
            </div>
            {ReceiverIsMe && (
                <div hidden={ReceiverIsMe} className="mb-4 col-span-1">
                <div className="mb-4 col-span-3 sm:col-span-1" >
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ReceiverName">
                    نام و نام خانوادگی گیرنده
                    </label>
                    <input id="ReceiverName" name="ReceiverName" type="text" value={address.ReceiverName || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4 col-span-3 sm:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ReceiverPhoneNumber">
                    شماره تماس گیرنده
                    </label>
                    <input id="ReceiverPhoneNumber" name="ReceiverPhoneNumber" type="number" value={address?.ReceiverPhoneNumber || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                </div>
            )}
            </div>
            <div className="items-end">
            <button type='submit' className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                ثبت
            </button>
            </div>
        </form>
    </>
  );
}
