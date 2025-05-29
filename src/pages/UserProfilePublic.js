import React, {Fragment, useEffect, useState} from "react";
import {AiOutlineMail} from "react-icons/ai";
import {CommentList, SkillList} from "../components";
import {useParams} from "react-router-dom";
import {getFreelancerById,} from "../axios/FreelancerService";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useKeycloak} from "@react-keycloak/web";
import DOMPurify from "dompurify";
import "../css/reset-tailwind-css.css";
import {getAllSkillsForFreelancer} from "../axios/SkillService";
import {getAllRatingByUserId} from "../axios/RatingService";

const UserProfilePublic = () => {

        const [userInfo, setUserInfo] = useState(null);
        const params = useParams();
        const [isLoading, setIsLoading] = useState(false);
        const {keycloak} = useKeycloak();
        const [userSkills, setUserSkills] = useState([]);
        const [comments, setComments] = useState([]);

        const fetchUserData = async () => {
            try {
                const id = params.id;
                setIsLoading(true);
                const userId = id;
                if (userId) {
                    const response = await getFreelancerById(userId);
                    setUserInfo(response.data);
                    setUserSkills((await getAllSkillsForFreelancer(userId)).data)
                    setComments((await getAllRatingByUserId(userId)).data)
                }
                setIsLoading(false);
            } catch (error) {

            }
        }


        useEffect(() => {
            fetchUserData();
        }, [keycloak.authenticated]);

        function getResumeContent(content) {
            return {
                __html: DOMPurify.sanitize(content),
            };
        }

        return (
            <>
                {isLoading && (
                    <div className="loading-modal">
                        <div className="loading-spinner"></div>
                        <p>Loading...</p>
                    </div>
                )}
                {userInfo && (
                    <>
                        <div className="container mx-auto flex items-center justify-center py-10">
                            <div className="w-full md:w-2/3 2xl:w-2/4 bg-white shadow-lg p-10 pb-20 rounded-lg">
                                <div className="flex flex-col items-center justify-center mb-4">
                                    <img
                                        src={userInfo?.profilePicture}
                                        alt={userInfo?.firstName}
                                        className="w-full h-48 object-contain rounded-lg"
                                    />
                                    <h1 className="text-4xl font-semibold text-slate-600">
                                        {userInfo?.firstName + " " + userInfo?.lastName}
                                    </h1>

                                    <div className="w-full flex flex-wrap lg:flex-row justify-between mt-8 text-sm">
                                        <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
                                            <AiOutlineMail/> {userInfo?.email ?? "No Email"}
                                        </p>
                                    </div>
                                </div>

                                <hr/>
                                {(userSkills) ? (
                                    <div className="container mx-auto mt-5">
                                        <h1 className="text-center text-2xl font-bold mb-5">Мои навыки</h1>
                                        <div className="flex justify-center">
                                            <div
                                                className={'w-full lg:1/2 flex flex-wrap gap-3 md-gap-6 py-10 md:py-14'}>
                                                <SkillList skills={userSkills}/>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="container mx-auto mt-5">
                                        <h1 className="text-center text-2xl font-bold mb-5">Навыки</h1>
                                        <div className="flex justify-center">
                                            <div
                                                className={'w-full lg:1/2 flex flex-wrap gap-3 md-gap-6 py-10 md:py-14'}>
                                                <SkillList skills={userSkills}/>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="w-full py-10">
                                    <div className="w-full flex flex-col-reverse md:flex-row gap-8 py-6">
                                        <div
                                            className="w-full md:w-2/3 flex flex-col gap-4 text-lg text-slate-600 mt-20 md:mt-0">
                                            <p className="text-[#0536e7]  font-semibold text-2xl">
                                                Резюме
                                            </p>
                                            {userInfo?.resumes && (
                                                <>
                                                    <div className="remove_all">
                                                        <h2 className="text-2xl text-gray-800 mb-4">
                                                            {userInfo?.resumes[0]?.resumeName}
                                                        </h2>

                                                        <div
                                                            className=""
                                                            dangerouslySetInnerHTML={getResumeContent(
                                                                userInfo?.resumes[0]?.resumeContent
                                                            )}
                                                        ></div>
                                                    </div>
                                                </>
                                            )}
                                            <span className="text-base text-justify leading-7">
                    </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full py-10">
                                    <CommentList comments={comments?.content}/>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <ToastContainer/>
            </>
        );
    }
;

export default UserProfilePublic;