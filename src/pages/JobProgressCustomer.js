import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import {AiOutlineSafetyCertificate} from "react-icons/ai";
import {useParams} from "react-router-dom";
import {CommentList, CustomButton, Error404, PayPalButton, RatingForm, SkillList} from "../components";
import {useKeycloak} from "@react-keycloak/web";
import {getJobById} from "../axios/JobService";
import {useSelector} from "react-redux";
import {RotatingLines} from "react-loader-spinner";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getChat, sendMessage} from "../axios/MessageService";
import {Chat} from "../components/chat";
import DownloadJobCard from "../components/card/DownloadJobCard";
import {getAllRatingByUserId} from "../axios/RatingService";

const JobProgressCustomer = () => {
    const params = useParams();
    const id = parseInt(params.id);
    const [job, setJob] = useState(null);
    const [selected, setSelected] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const {user, token} = useSelector((state) => state.user);
    const [errMessage, setErrMessage] = useState();
    const {keycloak} = useKeycloak();
    const [jobReference, setJobReference] = useState('');
    const [messages, setMessages] = useState([]);
    const jobRef = useRef(job);
    const [paymentData, setPaymentData] = useState({});
    const [rating, setRating] = useState(null);

    function fulfilPaymentData(jobData) {
        const paymentRequest = {
            currency: 'USD',
            customerId: jobData?.customer?.userId,
            freelancerId: jobData?.proposals?.find(proposal => proposal?.status === "ACCEPTED").freelancer.userId,
            jobId: jobData?.id,
            amount: jobData?.budget,
            paypalOrderId: ''
        };
        setPaymentData(paymentRequest);
    }

    async function fetchRating(job) {
        try {
            const response = await getAllRatingByUserId(job?.proposals?.find(proposal => proposal?.status === "ACCEPTED").freelancer.userId);
            const isFoundRating = response.data.content
                .filter(({jobId}) => jobId === job.id)
                .filter(({fromUser}) => fromUser === user.userId)
                .filter(({toUser}) => job?.proposals?.find(proposal => proposal?.status === "ACCEPTED").freelancer.userId === toUser);
            if (isFoundRating.length !== 0) {
                setRating(isFoundRating[0]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchJob = async () => {
        setIsLoading(true);
        if (id) {
            try {
                const response = await getJobById(id);
                setJob(response.data)
                await fetchChat(response.data)
                jobRef.current = response.data;
                fulfilPaymentData(response.data);
                await fetchRating(response.data);
            } catch (error) {
                console.log(error)
                setErrMessage(error.response.data)
            }

        }
        setIsLoading(false);
    }

    const fetchChat = async (jobData) => {
        try {
            let chatData;
            if (user?.role === 'CUSTOMER') {
                chatData = await getChat(user?.userId, jobData?.proposals?.find(proposal => proposal?.status === "ACCEPTED").freelancer.userId, token);
            } else {
                chatData = await getChat(user?.userId, jobData?.customer?.userId, token);
            }
            setMessages(chatData.data.messages);

        } catch (error) {
            console.error('Error fetching chat:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    useEffect(() => {
        fetchJob();
    }, [id]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (jobRef.current) {  // Use the jobRef to always get the latest job value
                await fetchChat(jobRef.current);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const sendMessageToService = async (newMessage) => {
        let data = {};
        if (user?.role === "CUSTOMER") {
            data = {
                senderId: user?.userId,
                recipientId: job?.proposals?.find(proposal => proposal?.status === "ACCEPTED").freelancer.userId,
                message: newMessage
            }
        } else {
            data = {
                senderId: user?.userId,
                recipientId: job?.customer?.userId,
                message: newMessage
            }
        }
        await sendMessage(data, token);
        await fetchChat(job)
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
                                    className='bg-green-500 w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                    <p className='text-lg text-center font-semibold text-gray-700'>
                                        В работе
                                    </p>
                                </div>
                            ) : job?.jobStatus === 'FINISH' ? (
                                <div
                                    className='bg-yellow-500 w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                                    <p className='text-lg text-center font-semibold text-gray-700'>
                                        Завершена
                                    </p>
                                </div>
                            ) : job?.jobStatus === 'PAID' ? (
                                <div
                                    className='bg-purple-500 w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
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
                    {messages && (
                        <Chat
                            messages={messages}
                            recipient={job?.proposals?.find(proposal => proposal?.status === "ACCEPTED").freelancer}
                            sender={user}
                            sendMessage={sendMessageToService}
                        />
                    )}
                    {job?.jobReference && (
                        <DownloadJobCard jobReference={job.jobReference}/>
                    )}
                    {
                        job?.jobStatus === 'PAID' && !rating && (
                            <div className="max-w-3xl mx-auto mt-8">
                                <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                                    <RatingForm
                                        userId={user?.role === "CUSTOMER" ? job?.proposals?.find(proposal => proposal?.status === "ACCEPTED").freelancer.userId : job?.customer?.userId}
                                        job={job}
                                        fetchRating={fetchRating}
                                    />
                                </div>
                            </div>
                        )}
                    {
                        job?.jobStatus === 'PAID' && rating && (
                            <div className="max-w-3xl mx-auto mt-8">
                                <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                                        <CommentList comments={[rating]}/>
                                </div>
                            </div>
                        )}
                    {
                        job?.jobStatus === 'FINISH' && (
                            <div className="max-w-3xl mx-auto mt-8">
                                <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                                    <PayPalButton data={paymentData}/>
                                </div>
                            </div>
                        )}

                </div>
            </div>
            <ToastContainer/>
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

export default JobProgressCustomer;