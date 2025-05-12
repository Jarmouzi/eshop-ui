'use client'
import { updateUserProfile } from "@/lib/services/UserProfileService";
import { UserProfile } from "@/lib/types/UserProfile";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import { FormEvent, useState } from "react";

export default function Profile({userProfile} :{userProfile: UserProfile}){

  const [formData, setFormData] = useState(userProfile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      updateUserProfile(formData)
      // const response = await fetch(`/api/auth/login?username=${username}&password=${password}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      // })
   
      // if (response.ok) {
      //   //router.push('/profile')
      // } else {
      //   // Handle errors
      // }
    }
  
    return (         
        <Card shadow="sm" className="min-h-[70vh]">
          <CardHeader className="font-semibold">
              پروفایل
          </CardHeader>      
          <Divider/>
          <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="gap-2 grid grid-cols-3 grid-rows-2 w-full text-right">
            {/* <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Username">
              نام کاربری 
              </label>
              <input id="Username" name="Username" type="text" placeholder="نام کاربری" disabled className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div> */}
            <div className="mb-4 col-span-3 sm:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
                نام
              </label>
              <input id="Name" name="Name" type="text" value={formData.Name} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-4 col-span-3 sm:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Family">
                نام خانوادگی
              </label>
              <input id="Family" name="Family" type="text" value={formData.Family} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-4 col-span-3 sm:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="NationalCode">
                کد ملی
              </label>
              <input id="NationalCode" name="NationalCode" type="number" value={formData.NationalCode || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-4 col-span-3 sm:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PhoneNumber">
                شماره تماس
              </label>
              <input id="PhoneNumber" name="PhoneNumber" type="number" value={formData.PhoneNumber || ''} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-4 col-span-3 sm:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                ایمیل
              </label>
              <input id="Email" name="Email" type="email" value={formData.Email} onChange={handleChange} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            </div>
            <div className="items-end">
              <button type='submit' className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                ویرایش اطلاعات
              </button>
            </div>
          </form>
          </CardBody>
        </Card>
    );
}