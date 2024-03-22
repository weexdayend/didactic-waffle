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
    <div className='flex gap-4 w-full h-fit'>
      <Combobox value={selected} onChange={(airport) => handleSelectionChange(airport)}>
        <div className="relative w-fit cursor-default overflow-hidden rounded-lg bg-white text-left">
          <Combobox.Input
            className="relative bg-white w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md text-zinc-800 truncate"
            displayValue={(airport :any) => {
              if(airport === null){
                return '';
              } else {
                return airport.name + ', '+ airport.city + ', '+ airport.state;
              }
            }}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for palace..."
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex gap-2 items-center pr-2">
            <ChevronDown
              className="h-5 w-5 text-zinc-800"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options             
            className="absolute mt-14 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg">
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
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    }`
                  }
                  value={airport}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {`${airport?.name}, ${airport?.city}, ${airport?.state}`}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
      {selected !== null && (
        <div 
          onClick={() => handleClearInformation()}
          className='flex w-fit p-3 h-full bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm cursor-pointer active:scale-95'>
          <XIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
}
