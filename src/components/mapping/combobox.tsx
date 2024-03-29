import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'

import {
    ChevronDown,
    CheckIcon,
    XIcon,
} from 'lucide-react'

import airports from '@/components/map/dummy.json'

type ComboboxProps = {
  filter: any[];
  handle: (information: any, value: [number, number]) => void;
  clearInformation: () => void;
}

export default function ComboboxDemo({ filter, handle, clearInformation }: ComboboxProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const filteredAirport = 
    query === ''
      ? airports
      : airports.filter((airport) => {
            const nameMatch = airport.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))

            const cityMatch = airport.city
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
            
            const stateMatch = airport.state
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
            
            return nameMatch || cityMatch || stateMatch
          }
        )

  const handleSelectionChange = (value: any) => {
    setSelected(value)
    handle(value, [Number(value.lat), Number(value.lon)])
  }

  const handleClearInformation = () => {
    setSelected(null)
    clearInformation()
  }

  return (
    <div className='flex flex-row w-full h-fit p-1 rounded-r-xl bg-white'>
      <Combobox value={selected} onChange={(airport) => handleSelectionChange(airport)}>
        <div className="relative w-full cursor-default rounded-tr-xl overflow-hidden bg-white text-left">
          <Combobox.Input
            className="relative bg-white w-full cursor-default rounded-tr-xl py-2 px-3 text-left text-zinc-800 truncate"
            displayValue={(airport :any) => {
              if(airport === null){
                return '';
              } else {
                return airport.name + ', '+ airport.city + ', '+ airport.state;
              }
            }}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pilih filter terlebih dahulu..."
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
            className="w-full truncate overflow-auto pt-4 rounded-b-xl pb-6 bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredAirport.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredAirport
              .filter((airport) => {
                return filter.includes(airport.cat)
              })
              .map((airport) => (
                <Combobox.Option
                  key={airport?.code}
                  className={`relative cursor-pointer select-none py-2 truncate text-zinc-600`}
                  value={airport}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate px-4 ${
                          selected ? 'font-bold' : 'font-normal'
                        }`}
                      >
                        {`${airport?.name}, ${airport?.city}, ${airport?.state}`}
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
      {selected !== null && (
        <div 
          onClick={() => handleClearInformation()}
          className='flex w-fit px-3 py-2.5 h-full bg-white rounded-tr-xl border-l border-zinc-200 cursor-pointer active:scale-95'>
          <XIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
}
