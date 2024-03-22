import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import {
  CheckIcon,
  ListFilter
} from 'lucide-react'

const people = [
  'Distributor',
  'Kios',
  'Gudang Lini III',
]

type SelectProps = {
  filtered: (value: any[]) => void;
}

export default function MyListbox({ filtered }: SelectProps) {
  const [selectedPeople, setSelectedPeople] = useState<any[]>([])

  const handleSelect = (selectedItems: any[]) => {
    setSelectedPeople(selectedItems);
    filtered(selectedItems)
  }

  return (
    <div className='flex flex-row w-fit h-fit p-1 rounded-l-xl bg-white border-r border-zinc-200'>
      <Listbox value={selectedPeople} onChange={handleSelect} multiple>
        <div className='relative w-fit'>
          <Listbox.Button className="relative bg-white w-fit cursor-default rounded-l-xl py-2 px-4 text-left">
            {/* <span className="block truncate text-zinc-800">
            {
              selectedPeople.length > 0 ? selectedPeople.map((person: any) => person).join(', ') : 'Pilih filter...'
            }
            </span> */}
            <ListFilter className='w-6 h-6 text-zinc-800' />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute max-h-60 w-fit pr-8 pt-4 rounded-b-xl pb-6 overflow-auto rounded-md bg-white text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {people.map((person, index) => (
                <Listbox.Option 
                  key={index} 
                  value={person}
                  className={`relative cursor-default select-none py-2 pl-10 pr-4 text-zinc-600`}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}