import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'

import {
    XIcon,
} from 'lucide-react'

type ComboboxProps = {
  handle: (information: any, value: [number, number]) => void;
  clearInformation: () => void;
  data: any;
}

export default function ComboboxDemo({ handle, clearInformation, data }: ComboboxProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const filteredAirport = 
    query === ''
      ? data
      : data.filter((airport: any) => {
            const nameMatch = airport.nama
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''));
            
            const kodeMatch = airport.kode
              ?.toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''));
            
            return nameMatch || kodeMatch;
          });

  const handleSelectionChange = (value: any) => {
    setSelected(value)
    handle(value, [value.long, value.lat])
  }

  const handleClearInformation = () => {
    setSelected(null)
    clearInformation()
  }

  return (
    <div className='flex flex-row w-full h-fit p-1 rounded-xl bg-white'>
      <Combobox value={selected} onChange={(airport) => handleSelectionChange(airport)}>
        <div className="relative w-full cursor-default rounded-xl overflow-hidden bg-white text-left">
          <Combobox.Input
            className="relative bg-white w-full cursor-default rounded-tr-xl py-2 px-3 text-left text-zinc-800 truncate"
            displayValue={(airport :any) => {
              if(airport === null){
                return '';
              } else {
                return airport.name
              }
            }}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari dengan kode atau nama..."
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <div className='absolute mt-10 max-h-60 w-full left-0 px-6'>
          <Combobox.Options
            className="w-full truncate overflow-auto pt-4 rounded-xl pb-6 bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {data && filteredAirport.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              data && filteredAirport
              .map((airport: any, index: number) => (
                <Combobox.Option
                  key={index}
                  className={`relative cursor-pointer select-none py-2 truncate text-zinc-600`}
                  value={airport}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`text-xs block truncate px-4 ${
                          selected ? 'font-bold' : 'font-normal'
                        }`}
                      >
                        {`${airport.kode} - ${airport?.nama}`}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
          </div>
        </Transition>
      </Combobox>
    </div>
  )
}
