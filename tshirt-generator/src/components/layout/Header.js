import React from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Header = () => {
    const navigation = [
        { name: 'Home', href: '/'},
        { name: 'T-shirt design', href: '/tshirt-design' },
        { name: 'Gallery', href: '/gallery' },
    ]

    //get current page from url
    const path = window.location.pathname;
    const page = '/' + path.split("/").pop();

    return (
        <Disclosure as="nav" className="bg-cyan-800">
            {({ open }) => (
                <>
                    <div className="mx-auto container sm:px-6 lg:px-4">
                        <div className="relative flex h-24 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 m-1 text-white hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex items-center ml-10 md:ml-0">
                                    <div className='rounded-xl border border-4 py-2 px-4'>
                                        <p className='font-bold text-2xl text-white '>T-shirt generator POC</p>
                                    </div>
                                </div>
                                <div className="items-center hidden sm:ml-12 sm:flex">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.href === page ? 'bg-cyan-700 text-white' : 'text-white hover:bg-cyan-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-lg font-medium'
                                                )}
                                                aria-current={item.href === page ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.href === page ? 'bg-cyan-700 text-white' : 'text-white hover:bg-cyan-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.href === page ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
