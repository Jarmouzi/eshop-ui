import { Checkbox } from "@nextui-org/checkbox";
import { FormEvent, useState } from 'react';
import { UserAddress } from '@/lib/types/UserAddress';
import SingleSelectDropDown from '../dropdown/singleSelectDropDown';
import { getFilteredCities } from '@/lib/services/CityService';
import { SelectItem } from '@/lib/types/SelectItem';
import { City } from '@/lib/types/City';
import { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css'; 

export default function AddressForm({ address, submit, states, cities }: { address: UserAddress, submit: (formData: UserAddress) => void, states: SelectItem[], cities: City[]  }) {
  //const states = await getAllStates()
  const OpenStreetMap = dynamic(() => import('../map'), { ssr: false });
  const [filteredCities, setFilteredCities] = useState(getFilteredCities(cities, address?.StateId))

  const [formData, setFormData] = useState(address);
    
  const [ReceiverIsMe, setReceiverIsMe] = useState(address.ReceiverName ? false : true);


  const handleCheckboxChange = () => {
      setReceiverIsMe(prev => !prev);
  };
  const handleStateChange = (key: string) => {
    setFilteredCities(getFilteredCities(cities, Number(key)));
    setFormData({ ...formData, StateId: Number(key) }); 
  }
  const handleCityChange = (key: string) => {
    setFormData({ ...formData, CityId: Number(key) }); 
  }  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleLocationSelect = (latlng: LatLng) => {
      setFormData({ ...formData, Latitude: Number(latlng.lat) }); 
      setFormData({ ...formData, Longtitude: Number(latlng.lng) }); 
      console.log('Selected Location:', latlng); // For debugging or further processing
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(ReceiverIsMe)
      {
        formData['ReceiverName'] = null;        
        formData['ReceiverPhoneNumber'] = null;
      }
      formData['Id'] = 0;
      formData['Number'] = 0;
      formData['UserId'] = "";
      formData['ModifiedBy'] = "";
      formData['IsDefault'] = true;

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
                    <input id="Title" name="Title" type="text" placeholder='مثال: خانه' value={formData.Title || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4 col-span-3 sm:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PhoneNumber">
                    استان
                    </label>
                    <SingleSelectDropDown  list={states} selectedKey={String(formData.StateId)} onSelectionChange={handleStateChange} />
                </div>
                <div className="mb-4 col-span-3 sm:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                    شهر
                    </label>
                    <SingleSelectDropDown  list={filteredCities} selectedKey={String(formData.CityId)} onSelectionChange={handleCityChange} />
                </div>
                <div className="mb-4 col-span-3" >
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Address">
                    آدرس
                    </label>
                    <input id="Address" name="Address" type="text" multiple value={formData.Address || ''} onChange={handleChange} className="h-28 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4 col-span-3 sm:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Number">
                    پلاک
                    </label>
                    <input id="Number" name="Number" type="number" value={formData.Number || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>                
                <div className="mb-4 col-span-3 sm:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Unit">
                    واحد
                    </label>
                    <input id="Unit" name="Unit" type="number" value={formData.Unit || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>                
                <div className="mb-4 col-span-3 sm:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PostalCode">
                    کد پستی
                    </label>
                    <input id="PostalCode" name="PostalCode" type="number" value={formData.PostalCode || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4 col-span-1">
                    <Checkbox isSelected={ReceiverIsMe} onValueChange={handleCheckboxChange} >گیرنده خودم هستم</Checkbox>
                </div>            
                <div hidden={ReceiverIsMe} className="mb-4 col-span-3 sm:col-span-1" >
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ReceiverName">
                    نام و نام خانوادگی گیرنده
                    </label>
                    <input id="ReceiverName" name="ReceiverName" type="text" value={formData.ReceiverName || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div hidden={ReceiverIsMe} className="mb-4 col-span-3 sm:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ReceiverPhoneNumber">
                    شماره تماس 
                    </label>
                    <input id="ReceiverPhoneNumber" name="ReceiverPhoneNumber" type="number" value={address?.ReceiverPhoneNumber || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4 col-span-3" >
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ReceiverPhoneNumber">
                    مکان خود را از روی نقشه انتخاب نمایید 
                    </label>

                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '80%', maxWidth: '600px' }}></div>
                    <OpenStreetMap onLocationSelect={handleLocationSelect} />
                    
                </div>
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
