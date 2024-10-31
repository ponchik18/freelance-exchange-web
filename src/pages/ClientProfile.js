import React, {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {AiOutlineMail} from "react-icons/ai";
import {FiEdit3, FiUpload} from "react-icons/fi";
import {Link, useParams} from "react-router-dom";
import {CommentList, CustomButton, JobCard, Loading, UserForm} from "../components";
import {useKeycloak} from "@react-keycloak/web";
import {getCustomerById, updateCustomer} from "../axios/CustomerService";
import {getAllJobsForCustomer} from "../axios/JobService";
import {updateFreelancer} from "../axios/FreelancerService";
import {getUserData} from "../axios/KeycloakService";
import {dispatch} from "../redux/store";
import {LoginRedux} from "../redux/userSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getAllRatingByUserId} from "../axios/RatingService";

const ClientProfile = () => {
    const params = useParams();
    const {user} = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState(null);
    const [jobs, setJobs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userDataOpen, setUserDataOpen] = useState(false);
    const {keycloak} = useKeycloak();
    const [comments, setComments] = useState([]);

    const onUserDataSubmit = async (data) => {
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {
                try {
                    await updateCustomer(data, user.userId, keycloak?.token);
                    toast.success("Изменения сохранены!");
                } catch (error) {
                    if(error?.response) {
                        toast.error(`Ошибка! ${error?.response?.data?.message}`);
                    } else {
                        toast.error(`Ошибка обновления данных!`);
                    }
                }
                const userData = await getUserData(keycloak?.token);
                if (userData.data) {
                    dispatch(LoginRedux(userData.data));
                }
            });
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            if (params?.id) {
                setUserInfo(user);
            } else {
                const userId = params?.id || keycloak?.tokenParsed?.sub;
                if (!userId) {
                    // keycloak.login();
                    return;
                } else {
                    const response = await getCustomerById(userId);
                    setUserInfo(response.data);
                    const jobsData = await getAllJobsForCustomer(userId);
                    setJobs(jobsData.data);
                    setComments((await getAllRatingByUserId(user.userId)).data)
                }
            }
            setIsLoading(false);
        };
        fetchUserData()
    }, [keycloak.tokenParsed]);

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div className='container mx-auto p-5'>

            <div className=''>
                <div className='w-full flex flex-col md:flex-row gap-3 justify-between'>
                    <h2 className='text-gray-600 text-xl font-semibold'>
                        Добро пожаловать, {userInfo?.lastName + ' ' + userInfo?.firstName}
                    </h2>

                    <div className='flex items-center justifu-center py-5 md:py-0 gap-4'>
                        <CustomButton
                            onClick={() => setUserDataOpen(true)}
                            iconRight={<FiEdit3/>}
                            containerStyles={`py-1.5 px-3 md:px-5 focus:outline-none bg-blue-600  hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600`}
                        />

                        <Link to='/upload-job'>
                            <CustomButton
                                title='Upload Job'
                                iconRight={<FiUpload/>}
                                containerStyles={`text-blue-600 py-1.5 px-3 md:px-5 focus:outline-none  rounded text-sm md:text-base border border-blue-600`}
                            />
                        </Link>
                    </div>
                </div>

                <div className='w-full flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text-sm'>
                    <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
                        <AiOutlineMail/> {userInfo?.email ?? "No Email"}
                    </p>
                    <p className='flex gap-1'>
                        <CommentList comments={comments?.content}/>
                    </p>

                    <div className='flex flex-col items-center mt-10 md:mt-0'>
                        <span className='text-xl'>{jobs?.length}</span>
                        <p className='text-blue-600 '>Объявлений о работе</p>
                    </div>
                </div>
            </div>

            <div className='w-full mt-20 flex flex-col gap-2'>
                <h5 className="text-2xl font-bold mb-4">Список опубликованных объявлений</h5>

                <div className='flex flex-wrap gap-3'>
                    {jobs?.map((job, index) => {
                        return <JobCard userData={userInfo} job={job} key={index}/>;
                    })}
                </div>
            </div>

            <UserForm
                open={userDataOpen}
                setOpen={setUserDataOpen}
                userInfo={userInfo}
                onUserDataSubmit={onUserDataSubmit}
            />
            <ToastContainer />
        </div>
    );
};

export default ClientProfile;