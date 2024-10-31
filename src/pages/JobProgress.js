import React, {useEffect, useState} from "react";
import moment from "moment";
import {AiOutlineSafetyCertificate} from "react-icons/ai";
import {useParams} from "react-router-dom";
import {CustomButton, Error404, ProposalForm, RatingForm, SkillList} from "../components";
import {useKeycloak} from "@react-keycloak/web";
import {finishJob, getAllJobs, getJobById, startJob} from "../axios/JobService";
import {useSelector} from "react-redux";
import {RotatingLines} from "react-loader-spinner";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {approveProposal, createProposal, rejectProposal} from "../axios/ProposalService";

const JobProgress = () => {
    const params = useParams();
    const id = parseInt(params.id);
    const [job, setJob] = useState(null);
    const [jobs, setJobs] = useState(null);
    const [selected, setSelected] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useSelector((state) => state.user);
    const [errMessage, setErrMessage] = useState();
    const [openProposalForm, setOpenProposalForm] = useState();
    const {keycloak} = useKeycloak();
    const [jobReference, setJobReference] = useState('')

    const onProposalCreate = async (data) => {
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {

                const response = await createProposal(data, keycloak?.token);
                if (response.status === 201) {
                    toast.success("Операция проведена успешно!");
                    setOpenProposalForm(false);
                } else {
                    toast.error("Ошибка!");
                }
            });
        }
    };

    const onStartWork = async (jobId) => {
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {

                const response = await startJob(jobId, keycloak?.token);
                if (response.status === 201) {
                    toast.success("Операция проведена успешно!");
                    await fetchJob()
                } else {
                    toast.error("Ошибка!");
                }
            });
        }
    }

    const onReject = async (proposalId) => {
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {

                const response = await rejectProposal(proposalId, keycloak?.token);
                if (response.status === 200) {
                    toast.success("Операция проведена успешно!");
                    await fetchJob()
                } else {
                    toast.error("Ошибка!");
                }
            });
        }
    }

    const onApprove = async (proposalId) => {
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {

                const response = await approveProposal(proposalId, keycloak?.token);
                if (response.status === 200) {
                    toast.success("Операция проведена успешно!");
                    await fetchJob()
                } else {
                    toast.error("Ошибка!");
                }
            });
        }
    }

    const fetchJob = async () => {
        setIsLoading(true);
        if (id) {
            try {
                const response = await getJobById(id);
                setJob(response.data)
                const responseJobs = await getAllJobs();
                setJobs(responseJobs.data.content)
            } catch (error) {
                console.log(error)
                setErrMessage(error.response.data)
            }

        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchJob();
    }, [id]);

    const sendFinishJob = async () => {
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {
                const data = {};
                data.jobReference = jobReference;
                const response = await finishJob(job?.id, data, keycloak?.token);
                setJobReference('')
                if (response.status === 201) {
                    toast.success("Операция проведена успешно!");
                    await fetchJob()
                } else {
                    toast.error("Ошибка!");
                }
            });
        }
    }

    return errMessage ? (
        <Error404
            title={errMessage?.statusCode}
            description={errMessage?.message}
            redirectUrl={'/find-jobs'}
            redirectUrlTitle={'Найти другой заказ'}
        />
    ) : job ? (
        <div className='container mx-auto'>
            <div className='w-full flex flex-col md:flex-row gap-10'>
                <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
                    <div className='w-full flex items-center justify-between'>
                        <div className='w-3/4 flex gap-2'>
                            <img
                                src={job?.customer?.profilePicture}
                                alt={job?.customer?.lastName + ' ' + job?.customer?.firstName}
                                className='w-20 h-20 md:w-24 md:h-20 rounded'
                            />

                            <div className='flex flex-col'>
                                <p className='text-xl font-semibold text-gray-600'>
                                    {job?.title}
                                </p>

                                <span className='text-gray-500 text-sm'>
                  {moment(job?.createdAt).fromNow()}
                </span>
                            </div>
                        </div>

                        <div className=''>
                            <AiOutlineSafetyCertificate className='text-3xl text-blue-500'/>
                        </div>
                    </div>

                    <div className='w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10'>
                        <div
                            className='bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                            <span className='text-sm'>Бюджет</span>
                            <p className='text-lg text-center font-semibold text-gray-700'>
                                {job?.budget?.toFixed(2)} $
                            </p>
                        </div>
                        {
                            job?.jobStatus === 'CREATED' ? (
                                <div
                                    className='bg-blue-500 w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                    <span className='text-sm'></span>
                                    <p className='text-lg text-center font-semibold text-gray-700'>
                                        В поиске исполнителя
                                    </p>
                                </div>
                            ) : job?.jobStatus === 'WORKED' ? (
                                <div
                                    className='bg-green-500 hover:bg-green-600 w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                    <p className='text-lg text-center font-semibold text-gray-700'>
                                        В работе
                                    </p>
                                </div>
                            ) : job?.jobStatus === 'FINISH' ? (
                                <div
                                    className='bg-yellow-500 hover:bg-yellow-600 w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                    <p className='text-lg text-center font-semibold text-gray-700'>
                                        Завершена
                                    </p>
                                </div>
                            ) : job?.jobStatus === 'PAID' ? (
                                <div
                                    className='bg-purple-500 hover:bg-purple-600 w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                    <p className='text-lg text-center font-semibold text-gray-700'>
                                        Оплачена
                                    </p>
                                </div>
                            ) : (<></>)
                        }
                    </div>

                    <div className='w-full flex gap-4 py-5'>
                        <CustomButton
                            onClick={() => setSelected(0)}
                            title='Описание работы'
                            containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                                selected === 0
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-gray-300"
                            }`}
                        />

                        <CustomButton
                            onClick={() => setSelected(1)}
                            title='О заказчике'
                            containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                                selected === 1
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-gray-300"
                            }`}
                        />
                    </div>

                    <div className='my-6'>
                        {selected === 0 ? (
                            <>
                                <p className='text-xl font-semibold'>Описание</p>
                                <div className={'remove_all'}>
                                    <span className='text-base' dangerouslySetInnerHTML={{__html: job?.description}}/>
                                </div>

                                <p className='text-xl font-semibold'>Навыки</p>
                                <div className='flex flex-wrap gap-3'>
                                    <SkillList skills={job?.skills}/>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='mb-6 flex flex-col'>
                                    <p className='text-xl text-blue-600 font-semibold'>
                                        {job?.customer?.lastName + ' ' + job?.customer?.firstName}
                                    </p>
                                    <span className='text-sm'>{job?.customer?.email}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className='w-full md:w-1/3  2xl:w-2/4 p-5 mt-20 md:mt-0'>
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                            <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
                                <img src="user-avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-2"/>
                                <h2 className="text-lg font-medium">User Name</h2>
                            </div>

                            <div className="overflow-y-auto max-h-96 min-h-96">
                                <div className="flex items-start mb-4">
                                    <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full mr-2"/>
                                    <div className="bg-blue-200 rounded-lg p-2">
                                        <p className="text-sm">Hello!</p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end mb-4">
                                    <div className="bg-gray-200 rounded-lg p-2">
                                        <p className="text-sm">Hi there!</p>
                                    </div>
                                    <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full ml-2"/>
                                </div>
                                <div className="flex items-start mb-4">
                                    <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full mr-2"/>
                                    <div className="bg-blue-200 rounded-lg p-2">
                                        <p className="text-sm">Hello!</p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end mb-4">
                                    <div className="bg-gray-200 rounded-lg p-2">
                                        <p className="text-sm">Hi there!</p>
                                    </div>
                                    <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full ml-2"/>
                                </div>
                                <div className="flex items-start mb-4">
                                    <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full mr-2"/>
                                    <div className="bg-blue-200 rounded-lg p-2">
                                        <p className="text-sm">Hello!</p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end mb-4">
                                    <div className="bg-gray-200 rounded-lg p-2">
                                        <p className="text-sm">Hi there!</p>
                                    </div>
                                    <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full ml-2"/>
                                </div>
                                <div className="flex items-start mb-4">
                                    <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full mr-2"/>
                                    <div className="bg-blue-200 rounded-lg p-2">
                                        <p className="text-sm">Hello!</p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end mb-4">
                                    <div className="bg-gray-200 rounded-lg p-2">
                                        <p className="text-sm">Hi there!</p>
                                    </div>
                                    <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full ml-2"/>
                                </div>
                                <div className="flex items-start mb-4">
                                    <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full mr-2"/>
                                    <div className="bg-blue-200 rounded-lg p-2">
                                        <p className="text-sm">Hello!</p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end mb-4">
                                    <div className="bg-gray-200 rounded-lg p-2">
                                        <p className="text-sm">Hi there!</p>
                                    </div>
                                    <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full ml-2"/>
                                </div>
                            </div>

                            <div className="flex">
                                <input type="text"
                                       className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
                                       placeholder="Type a message..."/>
                                <button
                                    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">Send
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-3xl mx-auto mt-8">
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                            <h2 className="text-lg font-medium mb-4">Загрузка результатов работы</h2>
                            <div className="mb-4">
                                <input type="text" id="workLink"
                                       value={jobReference}
                                       onChange={(event)=> setJobReference(event.target.value)}
                                       className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
                                       placeholder="Вставьте ссылку на выполненную работу"
                                />
                            </div>
                            <button id="submitWork"
                                    onClick={sendFinishJob}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mb-4">Подтвредить
                            </button>
                            {job?.jobReference && (<>
                                    <p className="text-gray-500">Ссылка на выполненный заказ будет тут.</p>
                                    <a href={job?.jobReference} className="text-blue-500 hover:underline">Перейти на результаты
                                        работы</a>
                                </>
                            )}
                        </div>
                    </div>

                    {
                        job?.jobStatus === 'PAID' && (
                    <div className="max-w-3xl mx-auto mt-8">
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                            <RatingForm
                                userId={user?.role === "CUSTOMER" ? job?.proposals?.find(proposal => proposal?.status === "ACCEPTED").freelancer.userId : jobs?.customer?.userId}/>
                        </div>
                    </div>
                            )}
                </div>
            </div>
            <ToastContainer/>
            <ProposalForm job={job} open={openProposalForm} setOpen={setOpenProposalForm}
                          onProposalCreate={onProposalCreate}/>
        </div>
    ) : (
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />
    )
};

export default JobProgress;