'use client'
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import {Tabs, Tab} from "@nextui-org/tabs";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Profile(){
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const username = formData.get('username')
      const password = formData.get('password')
   
      const response = await fetch(`/api/auth/login?username=${username}&password=${password}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
   
      if (response.ok) {
        //router.push('/profile')
      } else {
        // Handle errors
      }
    }
  
    return (         
        <Card shadow="sm" className="min-h-[80vh]">
          <CardHeader className="font-semibold">
              پروفایل
          </CardHeader>      
          <Divider/>
          <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="gap-2 grid grid-cols-3 grid-rows-2 w-full text-right">
            <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              نام کاربری 
              </label>
              <input id="username" name="username" type="text" placeholder="نام کاربری" disabled className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                نام
              </label>
              <input id="name" name="name" type="text" placeholder="نام" className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="family">
                نام خانوادگی
              </label>
              <input id="family" name="family" type="text" placeholder="نام خانوادگی" className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-4 col-span-3 sm:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                کد ملی
              </label>
              <input id="name" name="name" type="text" placeholder="کد ملی" className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
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