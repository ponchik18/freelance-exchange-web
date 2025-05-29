import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ClientCard, CustomButton, Header, ListBox, Loading} from "../components";
import {getAllCustomers} from "../axios/CustomerService";

const FindClients = () => {
    const [page, setPage] = useState(1);
    const [numPage, setNumPage] = useState(1);
    const [recordsCount, setRecordsCount] = useState(0);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [cmpLocation, setCmpLocation] = useState("");
    const [sort, setSort] = useState("Новые");
    const [isFetching, setIsFetching] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCustomer() {
            try {
                const response = await getAllCustomers();
                setData(response.data.content);
                setRecordsCount(response.data.totalElements)
                setNumPage(response.data.totalPages)
                setPage(response.data.number)
            } catch (error) {
                console.log("Error fetching customer:", error)
            }
        }
        fetchCustomer();
    }, []);

    const handleSearchSubmit = () => {
    };
    const handleShowMore = () => {
    };

    return (
        <div>
            <Header
                title='Найди заказчика с которым тебе будет комфортно'
                handleClick={handleSearchSubmit}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className={'container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd'}>
                <div className='w-full md:w-6/6 px-5 md:px-0'>
                    <div className='flex items-center justify-between mb-4'>
                        <p className='text-sm md:text-base'>
                            Всего: <span className='font-semibold'>{recordsCount}</span> найдено
                        </p>

                    </div>

                <div className='w-full flex flex-col gap-6'>
                    {data?.map((client, index) => (
                        <ClientCard cmp={client} key={index}/>
                    ))}

                    {isFetching && (
                        <div className='mt-10'>
                            <Loading/>
                        </div>
                    )}

                    <p className='text-sm text-right'>
                        Показано {data?.length} из {recordsCount}
                    </p>
                </div>

                {numPage > page + 1 && !isFetching && (
                    <div className='w-full flex items-center justify-center pt-16'>
                        <CustomButton
                            onClick={handleShowMore}
                            title='Load More'
                            containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                        />
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default FindClients;