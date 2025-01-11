import { Checkbox } from "@nextui-org/checkbox";
import { FormEvent, useState } from 'react';
import { UserAddress } from '@/lib/types/UserAddress';
import SingleSelectDropDown from '../dropdown/singleSelectDropDown';
import { getFilteredCities } from '@/lib/services/CityService';
import { SelectItem } from '@/lib/types/SelectItem';
import { City } from '@/lib/types/City';

// import dynamic from "next/dynamic";
// import { LatLng } from "leaflet";
// import MapComponent from "../map";

export default function AddressForm({ address, submit, states, cities }: { address: UserAddress, submit: (formData: UserAddress) => void, states: SelectItem[], cities: City[]  }) {
  //const MapComponent = dynamic(() => import('../map'), { ssr: false });
  const [filteredCities, setFilteredCities] = useState(getFilteredCities(cities, address?.stateId))

  const [formData, setFormData] = useState(address);
    
  
  const [ReceiverIsMe, setReceiverIsMe] = useState(address.receiverName ? true : false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      if(name == 'ReceiverIsMe')
        setReceiverIsMe((prevState) => ( checked));
      else 
        setFormData({ ...formData, isDefault: checked }); 
  };

  const handleStateChange = (key: string) => {
    setFilteredCities(getFilteredCities(cities, Number(key)));
    setFormData({ ...formData, stateId: Number(key) }); 
  }
  const handleCityChange = (key: string) => {
    setFormData({ ...formData, cityId: Number(key) }); 
  }  

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

//   const handleLocationSelect = (latlng: LatLng) => {
//       setFormData({ ...formData, latitude: Number(latlng.lat) }); 
//       setFormData({ ...formData, longtitude: Number(latlng.lng) }); 
//       console.log('Selected Location:', latlng); // For debugging or further processing
//   };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(ReceiverIsMe)
      {
        formData['receiverName'] = null;        
        formData['receiverPhoneNumber'] = null;
      }
      submit(formData);      
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className="gap-2 grid grid-cols-12 grid-rows-2 w-full text-right">
                <div className="mb-4 col-span-12 sm:col-span-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    عنوان آدرس
                    </label>
                    <input id="title" name="title" type="text" placeholder='مثال: خانه' value={formData.title || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4 col-span-12 sm:col-span-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stateId">
                    استان
                    </label>
                    <SingleSelectDropDown  list={states} selectedKey={String(formData.stateId)} onSelectionChange={handleStateChange} />
                </div>
                <div className="mb-4 col-span-12 sm:col-span-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cityId">
                    شهر
                    </label>
                    <SingleSelectDropDown list={filteredCities} selectedKey={String(formData.cityId)} onSelectionChange={handleCityChange} />
                </div>
                <div className="mb-4 col-span-12 sm:col-span-12 sm:-mt-6" >
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    آدرس
                    </label>
                    <textarea id="address" name="address" rows={3} value={formData.address || ''} onChange={handleAddressChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4 col-span-12 sm:col-span-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                    پلاک
                    </label>
                    <input id="number" name="number" type="number" value={formData.number || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>                
                <div className="mb-4 col-span-12 sm:col-span-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit">
                    واحد
                    </label>
                    <input id="unit" name="unit" type="number" value={formData.unit || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>                
                <div className="mb-4 col-span-12 sm:col-span-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">
                    کد پستی
                    </label>
                    <input id="postalCode" name="postalCode" type="number" value={formData.postalCode || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4 col-span-12 sm:col-span-3 sm:mt-8">
                    <Checkbox name="isDefault" isSelected={formData.isDefault} onChange={handleCheckboxChange}>آدرس پیش فرض</Checkbox>
                </div> 
                <div className="mb-4 col-span-12 sm:col-span-4 sm:mt-8">
                    <Checkbox name="ReceiverIsMe" isSelected={ReceiverIsMe} onChange={handleCheckboxChange} >گیرنده خودم هستم</Checkbox>
                </div>            
                <div hidden={ReceiverIsMe} className="mb-4 col-span-12 sm:col-span-4" >
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="receiverName">
                    نام و نام خانوادگی گیرنده
                    </label>
                    <input id="receiverName" name="receiverName" type="text" value={formData.receiverName || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div hidden={ReceiverIsMe} className="mb-4 col-span-12 sm:col-span-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="receiverPhoneNumber">
                    شماره تماس 
                    </label>
                    <input id="receiverPhoneNumber" name="receiverPhoneNumber" type="number" value={formData?.receiverPhoneNumber || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                {/* <div className="mb-4 col-span-12 sm:col-span-12" >
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                    مکان خود را از روی نقشه انتخاب نمایید 
                    </label>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '80%', maxWidth: '600px' }}></div>
                    <MapComponent onPositionChange={handleLocationSelect} />                    
                </div> */}
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
