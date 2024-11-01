import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {CustomButton, Header, JobCard, ListBox} from "../components";
import {BiBriefcaseAlt2} from "react-icons/bi";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {getAllJobs} from "../axios/JobService";
import {useKeycloak} from "@react-keycloak/web";
import {getAllSkills} from "../axios/SkillService";
import {RotatingLines} from "react-loader-spinner";

const FindJobs = () => {

    const [sort, setSort] = useState("NEW")
    const [page, setPage] = useState(1);
    const [numPage, setNumPage] = useState(1)
    const [recordCount, setRecordCount] = useState(0)
    const [jobs, setJobs] = useState([])
    const [skills, setSkills] = useState([]);
    const [search, setSearch] = useState("");
    const [skillIds, setSkillIds] = useState([]);
    const [startBudget, setStartBudget] = useState(0);
    const [endBudget, setEndBudget] = useState(9999999999);
    const [filterJobTypes, setFilterJobTypes] = useState([]);
    const [isFetching, setIsFetching] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const {keycloak} = useKeycloak();

    const location = useLocation()
    const navigate = useNavigate()

    const clearInput = ()=> {
        setSearch('');
        setSkillIds([]);
        setStartBudget(0);
        setEndBudget(9999999999);
        setSort("NEW")
    }

    const fetchJobs = async () => {
        setIsLoading(true);
        let params = {
            search: search,
            skillIds: skillIds,
            startBudget: startBudget,
            endBudget: endBudget,
            sort: sort
        }
        try {
            const response = await getAllJobs(params);
            setJobs(response?.data)
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const addOrDeleteSkill = async (selectedSkill) => {
        const index = skillIds.findIndex((skillId) => skillId === selectedSkill)
        if (index === -1) {
            setSkillIds([...skillIds, selectedSkill]);
        } else {
            const updatedSkillIds = skillIds.filter(skillId => skillId !== selectedSkill);
            setSkillIds(updatedSkillIds);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchJobs();
            const response = await getAllSkills()
            setSkills(response.data);
        }
        fetchData();
    }, [skillIds, search, startBudget, endBudget, sort]);

    return (
        <div>
            <Header
                title={'Найди заказ по своей душе!'}
                type={'home'}
                skills={skills}
                onClickSkill={addOrDeleteSkill}
                skillIds={skillIds}
                handleClick={() => {
                }}
                searchQuery={search}
                setSearchQuery={setSearch}
                clearInput={clearInput}
            />
            <div className={'container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd'}>
                <div className={"hidden md:flex flex-col w-1/6 h-fit bg-white shadow-sm"}>
                    <p className={"text-lg font-semibold text-slate-600"}>Фильтрация</p>

                    <div className={"py-2"}>
                        <div className={"flex justify-between mb-3 "}>
                            <p className={"flex items-center gap-2 font-semibold"}>
                                <BiBriefcaseAlt2/>
                                Детали заказа
                            </p>
                            <button>
                                <MdOutlineKeyboardArrowDown/>
                            </button>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className="bg-gray-200 p-4 rounded-md">
                                <h2 className="text-lg font-semibold mb-2">Фильтрация оплаты за заказ</h2>
                                <div className="mb-4">
                                    <label htmlFor="startBudget"
                                           className="block text-sm font-medium text-gray-700">Минимальная
                                        оплата:</label>
                                    <input
                                        value={startBudget}
                                        onChange={(e)=>setStartBudget(e.target.value)}
                                        type="number"
                                        id="startBudget"
                                        name="startBudget"
                                        className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="endBudget"
                                           className="block text-sm font-medium text-gray-700">Максимальная
                                        оплата:</label>
                                    <input
                                        value={endBudget}
                                        onChange={(e)=>setEndBudget(e.target.value)}
                                        type="number"
                                        id="endBudget"
                                        name="endBudget"
                                        className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-5/6 px-5 md:px-0'>
                    <div className='flex items-center justify-between mb-4'>
                        <p className='text-sm md:text-base'>
                            Найдено <span className='font-semibold'>{jobs?.totalElements}</span> активных
                            заказов
                        </p>

                        <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center'>
                            <p className='text-sm md:text-base'>Сортировать по:</p>

                            <ListBox sort={sort} setSort={setSort}/>
                        </div>
                    </div>
                    {isLoading ? (
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="96"
                            visible={true}
                        />
                    ) : (
                        <div className='w-full flex flex-wrap gap-4'>
                            {jobs?.content?.map((job, index) => (
                                <JobCard job={job} userData={job?.customer}/>
                            ))}
                        </div>
                    )}
                    {numPage > page && !isFetching && (
                        <div className='w-full flex items-center justify-center pt-16'>
                            <CustomButton
                                title='Загрузить ещё'
                                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindJobs;