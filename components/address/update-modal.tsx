'use client';

import { Checkbox, Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import { UserAddress } from '@/lib/types/UserAddress';
import { PencilIcon } from '@heroicons/react/24/outline';
import CloseAddress from './close-address';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider, Dropdown } from '@nextui-org/react';
import { updateUserAddress } from '@/lib/services/UserAddressService';
import AddressForm from './form';
import { SelectItem } from '@/lib/types/SelectItem';
import { City } from '@/lib/types/City';

type ProductVariantSearchParams = {
  [key: string]: string;
};

export default function UpdateAddressModal({ address, states, cities }: { address: UserAddress, states: SelectItem[], cities: City[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ReceiverIsMe, setReceiverIsMe] = useState(false);
  const openAddress = () => setIsOpen(true);
  const closeAddress = () => setIsOpen(false);

  // useEffect(() => {
  //     if (!isOpen) {
  //       setIsOpen(true);
  //     }
  // }, [isOpen]);

  const handleSubmit = async (formData: UserAddress) => {
      updateUserAddress(formData)
    }

  return (
    <>
      <button aria-label="Open address" onClick={openAddress}>
        <PencilIcon className="h-4 transition-all ease-in-out hover:scale-110"/>
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
            <DialogPanel className="flex justify-center h-full w-full">
              
              <div className="flex items-center justify-between text-neutral-500">
                <p className="text-lg font-semibold">ویرایش آدرس</p>

                <button aria-label="Close address" onClick={closeAddress}>
                  <CloseAddress className='text-neutral-500' />
                </button>
              </div>
              <Card shadow="sm" className="min-h-[70vh] min-w-[70vw]">
                <CardHeader className="font-semibold">
                  ویرایش آدرس
                  <button aria-label="Close address" onClick={closeAddress}>
                    <CloseAddress className='text-neutral-500' />
                  </button>
                </CardHeader>      
                <Divider/>
                <CardBody>
                  <AddressForm address={address} submit={handleSubmit} states={states} cities={cities} />
                </CardBody>
              </Card>

            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
