import {Fragment} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {BsCheck2, BsChevronExpand} from "react-icons/bs";

const options = [
    {name: "Новые", value: "NEW"},
    {name: "Старый", value: "OLD"},
    {name: "Бюджет ↑", value: "BUDGET_ASC"},
    {name: "Бюджет ↓", value: "BUDGET_DESC"}]
;

const ListBox = ({sort, setSort}) => {

    function getSortName(sortValue) {
        return options.find((op)=> op.value===sortValue).name
    }
    return (
        <div className='w-[8rem] md:w-[10rem]'>
            <Listbox value={sort} onChange={setSort}>
                <div className='relative mt-1'>
                    <Listbox.Button
                        className={
                            "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                        }
                    >
                        <span className='block truncate'>{getSortName(sort)}</span>

                        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <BsChevronExpand
                  className='h-5 w-5 text-gray-500'
                  aria-hidden='true'
              />
            </span>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Listbox.Options
                            className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                            {options.map((op, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? "bg-[#1d4fd830] text-[#1d4ed8]" : "text-gray-900"
                                        }`
                                    }
                                    value={op.value}
                                    selected={op.value === sort}
                                >
                                    {({selected}) => (
                                        <>
                      <span
                          className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                          }`}
                      >
                        {op.name}
                      </span>
                                            {selected ? (
                                                <span
                                                    className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#1d4ed8]'>
                          <BsCheck2 className='h-5 w-5' aria-hidden='true'/>
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
    );
};

export default ListBox;