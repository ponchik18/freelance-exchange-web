import React, {useEffect, useState} from "react";
import moment from "moment";
import {AiOutlineSafetyCertificate} from "react-icons/ai";
import {Link, useParams} from "react-router-dom";
import {CommentList, CustomButton, Error404, FreelancerCard, JobCard, ProposalForm, SkillList} from "../components";
import {useKeycloak} from "@react-keycloak/web";
import {getAllJobs, getJobById, startJob} from "../axios/JobService";
import {useSelector} from "react-redux";
import {RotatingLines} from "react-loader-spinner";
import {createResume} from "../axios/ResumeService";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {approveProposal, createProposal, rejectProposal} from "../axios/ProposalService";
import {getAllRatingByUserId} from "../axios/RatingService";

const JobDetailCustomer = () => {
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
    const [comments, setComments] = useState([]);

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

    const onStartWork = async(jobId) => {
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

    const onReject = async(proposalId) => {
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

    const onApprove = async(proposalId) => {
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
                setComments((await getAllRatingByUserId(response.data.customer.userId)).data.content)
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

    return errMessage? (
        <Error404
            title={errMessage?.statusCode}
            description={errMessage?.message}
            redirectUrl={'/find-jobs'}
            redirectUrlTitle={'Найти другой заказ'}
        />
    ): job ? (
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
                                <Link to={'/job-progress/'+id}>
                                    <div
                                        className='bg-green-500 hover:bg-green-600 w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                        <span className='text-sm'>Изучить подробнее</span>
                                        <p className='text-lg text-center font-semibold text-gray-700'>
                                            В работе
                                        </p>
                                    </div>
                                </Link>
                            ) : job?.jobStatus === 'FINISH' ? (
                                    <Link to={'/job-progress/'+id}>
                                        <div
                                            className='bg-yellow-500 hover:bg-yellow-600 w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                            <span className='text-sm'>Изучить подробнее</span>
                                            <p className='text-lg text-center font-semibold text-gray-700'>
                                                Завершена
                                            </p>
                                        </div>
                                    </Link>
                            ) : job?.jobStatus === 'PAID' ? (
                                    <Link to={'/job-progress/'+id}>
                                        <div
                                            className='bg-purple-500 hover:bg-purple-600 w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                            <span className='text-sm'>Изучить подробнее</span>
                                            <p className='text-lg text-center font-semibold text-gray-700'>
                                                Оплачена
                                            </p>
                                        </div>
                                    </Link>
                            ) : (<></>)
                        }

                        <div
                            className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
                            <span className='text-sm'>Отклики</span>
                            <p className='text-lg font-semibold text-gray-700'>
                                {job?.proposals?.length}
                            </p>
                        </div>
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
                                    <div className="w-full py-10">
                                        <CommentList comments={comments}/>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                {(job?.customer?.userId !== user?.userId) ? (
                <div className='w-full md:w-1/3 2xl:w-2/4 p-5 mt-20 md:mt-0'>
                    <p className='text-gray-500 font-semibold'>Похожие объявления</p>

                    <div className='w-full flex flex-wrap gap-4'>
                        {jobs?.slice(0, 2).map((job, index) => (
                            <JobCard job={job} key={index} userData={job?.customer}/>
                        ))}
                    </div>
                </div>
                ) : (
                    <>
                        <div className='w-full p-5 2xl:w-2/4 mt-20 md:mt-0'>
                            <p className='text-gray-500 font-semibold'>Отклики на заказ</p>

                            <div className='w-full flex flex-col gap-6'>
                                {job?.proposals?.map((proposal) => (
                                    <FreelancerCard
                                        proposal={proposal}
                                        onReject={onReject}
                                        onApprove={onApprove}
                                        onStartWork={onStartWork}
                                        jobId={job?.id}
                                        jobStatus={job?.jobStatus}

                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
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

export default JobDetailCustomer;