import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import {
  CheckIcon
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
    <Listbox value={selectedPeople} onChange={handleSelect} multiple>
      <div className='relative w-full'>
        <Listbox.Button className="relative bg-white w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md ">
          <span className="block truncate text-zinc-800">
          {
            selectedPeople.length > 0 ? selectedPeople.map((person: any) => person).join(', ') : 'Pilih filter...'
          }
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {people.map((person, index) => (
              <Listbox.Option 
                key={index} 
                value={person}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
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
  )
}