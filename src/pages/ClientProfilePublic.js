import React, {useEffect, useState} from "react";
import {AiOutlineMail} from "react-icons/ai";
import {useParams} from "react-router-dom";
import {CommentList, JobCard, Loading} from "../components";
import {useKeycloak} from "@react-keycloak/web";
import {getCustomerById} from "../axios/CustomerService";
import {getAllJobsForCustomer} from "../axios/JobService";
import "react-toastify/dist/ReactToastify.css";
import {getAllRatingByUserId} from "../axios/RatingService";

const ClientProfilePublic = () => {
    const params = useParams();

    const [userInfo, setUserInfo] = useState(null);
    const [jobs, setJobs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userDataOpen, setUserDataOpen] = useState(false);
    const {keycloak} = useKeycloak();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const userId = params.id;
                if (!userId) {
                    // keycloak.login();
                } else {
                    const response = await getCustomerById(userId);
                    setUserInfo(response.data);
                    const jobsData = await getAllJobsForCustomer(userId);
                    setJobs(jobsData.data);
                    setComments((await getAllRatingByUserId(userId)).data)
                }
            } catch (error) {
            }
        }
        fetchUserData()
        setIsLoading(false);
    }, [params]);

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div className='container mx-auto p-5'>

            <div className=''>
                <div className='w-full flex flex-col md:flex-row gap-3 justify-between'>
                    <h2 className='text-gray-600 text-xl font-semibold'>
                        {userInfo?.lastName + ' ' + userInfo?.firstName}
                    </h2>
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
        </div>
    );
};

export default ClientProfilePublic;