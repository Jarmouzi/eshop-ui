'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { UserAddress } from '@/lib/types/UserAddress';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import CloseAddress from './close-address';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider, Dropdown } from '@nextui-org/react';
import { createUserAddress } from '@/lib/services/UserAddressService';
import AddressForm from './form';
import { SelectItem } from '@/lib/types/SelectItem';
import { City } from '@/lib/types/City';

type ProductVariantSearchParams = {
  [key: string]: string;
};

export default function InsertAddressModal({states, cities} :{states: SelectItem[], cities: City[]}) {
  const [isOpen, setIsOpen] = useState(false);
  const openAddress = () => setIsOpen(true);
  const closeAddress = () => setIsOpen(false);

  // useEffect(() => {
  //     if (!isOpen) {
  //       setIsOpen(true);
  //     }
  // }, [isOpen]);

  const handleSubmit = async (formData: UserAddress) => {
      createUserAddress(formData)
      closeAddress();
    }

  return (
    <>
      <button aria-label="Open address" onClick={openAddress}>
      <Card shadow="sm">
        <CardBody className='text-right py-5 min-h-24'>
          <div className="absolute right-0 mr-4">
            <PlusIcon className="text-green-500 h-14 w-14 transition-all ease-in-out hover:scale-110"/>
          </div>
          <h2 className="mr-20 mt-4 text-green-800">افزودن آدرس جدید</h2>
        </CardBody>
      </Card>
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeAddress} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col">
              
              {/* <div className="flex items-center justify-between text-neutral-500">
                <p className="text-lg font-semibold"> آدرس جدید</p>

                <button aria-label="Close address" onClick={closeAddress}>
                  <CloseAddress className='text-neutral-500' />
                </button>
              </div> */}
              <Card shadow="sm" className="min-h-[70vh] min-w-[70vw] p-1 md:m-14 ">
                <CardHeader className="font-semibold pr-1">
                   آدرس جدید
                  <button aria-label="Close address" onClick={closeAddress} className='absolute left-2'>
                    <CloseAddress />
                  </button>
                </CardHeader>      
                <Divider/>
                <CardBody>
                  <AddressForm address={{} as UserAddress} submit={handleSubmit} states={states} cities={cities} />
                </CardBody>
              </Card>

            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
