'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, MouseEventHandler, Suspense, useEffect, useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Search from './search';
import { Menu } from '@/lib/types/Menu';

function MenuList({ items, level = 0, expandedIdx, setExpandedIdx, onClose }: { items: Menu[], level: number, expandedIdx: number|null, setExpandedIdx: React.Dispatch<React.SetStateAction<number | null>>, onClose: MouseEventHandler  }) {
  return (
    <ul style={{ paddingLeft: level * 16 }}>
      {items.map((item, idx) => {
        const hasChildren = !!item.Children;
        const isExpanded = expandedIdx === idx;

        return (
          <li key={item.Title}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link href={item.PageAddress} onClick={onClose} style={{ flex: 1 }}>
                {item.Title}
              </Link>
              {hasChildren && (
                <button
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                  onClick={e => {
                    e.preventDefault();
                    setExpandedIdx(isExpanded ? null : idx);
                  }}
                  style={{ marginLeft: 8 }}
                >
                  {isExpanded ? "▲" : "▼"}
                </button>
              )}
            </div>
            {hasChildren && isExpanded && (
              <MenuLevel
                items={item.Children}
                level={level + 1}
                onClose={onClose}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

function MenuLevel({ items, level, onClose }: { items: Menu[], level: number, onClose: MouseEventHandler  }) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  return (
    <MenuList
      items={items}
      level={level}
      expandedIdx={expandedIdx}
      setExpandedIdx={setExpandedIdx}
      onClose={onClose}
    />
  )}

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <Suspense>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white md:hidden"
      >
        <Bars3Icon className="h-4" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
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
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <DialogPanel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-4 w-full">
                  <Suspense>
                    <Search />
                  </Suspense>
                </div>
                
                <MenuLevel items={menu} level={0} onClose={closeMobileMenu} />
                {/* {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: Menu) => (
                      <li
                        className="py-2 text-sm text-black transition-colors hover:text-neutral-500 dark:text-white"
                        key={item.Id}
                      >
                        <Link href="/" onClick={closeMobileMenu}>
                          {item.Title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null
                } */}
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </Suspense>
  );
}
