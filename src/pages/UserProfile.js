import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {AiOutlineMail} from "react-icons/ai";
import {CustomButton, TextInput, UserForm, SkillList, SkillForm, CommentList} from "../components";
import {useParams} from "react-router-dom";
import {getFreelancerById, updateFreelancer,} from "../axios/FreelancerService";
import {Editor} from "@tinymce/tinymce-react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {createResume} from "../axios/ResumeService";
import {useKeycloak} from "@react-keycloak/web";
import {getUserData} from "../axios/KeycloakService";
import {dispatch} from "../redux/store";
import {LoginRedux} from "../redux/userSlice";
import DOMPurify from "dompurify";
import "../css/reset-tailwind-css.css";
import {
    addSkillToFreelancer,
    getAllSkillsNotForFreelancer,
    getAllSkillsForFreelancer,
    deleteSkillToFreelancer
} from "../axios/SkillService";
import {getCustomerById} from "../axios/CustomerService";
import {getAllJobsForCustomer} from "../axios/JobService";
import {getAllRatingByUserId} from "../axios/RatingService";


const ResumeForm = ({open, setOpen, resume, onUserResumeSubmit}) => {
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        formState: {errors},
    } = useForm({
        mode: "onChange",
        defaultValues: {...resume},
    });

    const closeModal = () => setOpen(false);

    return (
        <>
            <Transition appear show={open ?? false} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold leading-6 text-gray-900"
                                    >
                                        Редактировать резюме
                                    </Dialog.Title>
                                    <form
                                        className="w-full mt-2 flex flex-col gap-5"
                                        onSubmit={handleSubmit(onUserResumeSubmit)}
                                    >
                                        <TextInput
                                            name="resumeName"
                                            label="Название резюме"
                                            placeholder="например: Java Developer CV"
                                            type="text"
                                            register={register("resumeName", {
                                                required: "Параметр название резюме обязателен",
                                            })}
                                            error={
                                                errors?.resumeName ? errors?.resumeName?.message : ""
                                            }
                                        />
                                        <Editor
                                            apiKey="gol8ql8ovvqu6xklzjig703pipmwpo7tcfm6yy07ve0q97vq"
                                            onEditorChange={(resumeContent) => {
                                                register("resumeContent", {value: resumeContent});
                                                setValue("resumeContent", resumeContent);
                                            }}
                                            initialValue={resume?.resumeContent}
                                            init={{
                                                language: "ru",
                                                plugins:
                                                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                                                toolbar:
                                                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                                tinycomments_mode: "embedded",
                                                tinycomments_author: "Author name",
                                                mergetags_list: [
                                                    {value: "First.Name", title: "First Name"},
                                                    {value: "Email", title: "Email"},
                                                ],
                                                ai_request: (request, respondWith) =>
                                                    respondWith.string(() =>
                                                        Promise.reject("See docs to implement AI Assistant")
                                                    ),
                                            }}
                                        />

                                        {errors.name && <span>This field is required</span>}

                                        {errors.about && (
                                            <span
                                                role="alert"
                                                className="text-xs text-red-500 mt-0.5"
                                            >
                        {errors.about?.message}
                      </span>
                                        )}

                                        <div className="mt-4">
                                            <CustomButton
                                                type="submit"
                                                containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                                                title={"Сохранить"}
                                            />
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

const UserProfile = () => {
    const {user} = useSelector((state) => state.user);
    const [userDataOpen, setUserDataOpen] = useState(false);
    const [resumeOpen, setResumeOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const {keycloak} = useKeycloak();
    const [allSkills, setAllSkills] = useState([])
    const [userSkills, setUserSkills] = useState([]);
    const [comments, setComments] = useState([]);


    const onUserDataSubmit = async (data) => {
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {
                try {
                    await updateFreelancer(data, user.userId, keycloak?.token);
                    toast.success("Изменения сохранены!");
                } catch (error) {
                    if (error?.response) {
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
    const onAddSkillToFreelancer = async (data) => {
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {
                const userId = user.userId;
                console.log(keycloak?.token)
                const response = await addSkillToFreelancer(userId, data.skillId, keycloak?.token);
                if (response.status === 201) {

                    setAllSkills((await getAllSkillsNotForFreelancer(user.userId)).data)
                    setUserSkills((await getAllSkillsForFreelancer(user.userId, keycloak?.token)).data)
                } else {
                    toast.error("Ошибка!");
                }
            });
        }
    }

    const onUserResumeSubmit = async (data) => {
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {
                data.freelancerId = userInfo.userId;
                const response = await createResume(data, keycloak?.token);
                if (response.status === 201) {
                    toast.success("Операция проведена успешно!");
                } else {
                    toast.error("Ошибка!");
                }
            });
        }
    };
    const onDeleteSkill=async(skillId) => {
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {
                await deleteSkillToFreelancer(user.userId, skillId, keycloak?.token)

                setAllSkills((await getAllSkillsNotForFreelancer(user.userId)).data)
                setUserSkills((await getAllSkillsForFreelancer(user.userId, keycloak?.token)).data)
            })
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            const userId = params?.id || keycloak?.tokenParsed?.sub;
            if (userId) {
                    const response = await getFreelancerById(userId);
                    setUserInfo(response.data);
                    setAllSkills((await getAllSkillsNotForFreelancer(userId)).data)
                    setUserSkills((await getAllSkillsForFreelancer(userId)).data)
                    setComments((await getAllRatingByUserId(userId)).data)
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

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
                                {(userInfo && user?.userId === userInfo?.userId) && (
                                <button
                                    className="w-full md:w-64 bg-blue-600 text-white mt-4 py-2 rounded"
                                    onClick={() => setUserDataOpen(true)}
                                >
                                    Редактирование профиля
                                </button>
                                )}
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
                            {(userInfo && user?.userId === userInfo?.userId) ? (
                                <div className="container mx-auto mt-5">
                                    <h1 className="text-center text-2xl font-bold mb-5">Мои навыки</h1>
                                    <div className="flex justify-center">
                                        <div className={'w-full lg:1/2 flex flex-wrap gap-3 md-gap-6 py-10 md:py-14'}>
                                            <SkillList skills={userSkills} handleDeleteSkill={onDeleteSkill}/>
                                        </div>
                                    </div>
                                </div>
                            ): (
                                <div className="container mx-auto mt-5">
                                    <h1 className="text-center text-2xl font-bold mb-5">Навыки</h1>
                                    <div className="flex justify-center">
                                        <div className={'w-full lg:1/2 flex flex-wrap gap-3 md-gap-6 py-10 md:py-14'}>
                                            <SkillList skills={userSkills}/>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(userInfo && user?.userId === userInfo?.userId) && (
                                <>
                            {allSkills?.length !== 0 && (
                                <div className="flex flex-col">
                                    <SkillForm onSubmit={onAddSkillToFreelancer} skills={allSkills}/>
                                </div>
                            )}
                                </>
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
                        {(userInfo && user?.userId === userInfo?.userId) && (
                      <button
                          className="w-full md:w-64 bg-blue-600 text-white mt-4 py-2 rounded"
                          onClick={() => setResumeOpen(true)}
                      >
                        {(userInfo?.resumes && userInfo?.resumes?.lenght !== 0)
                            ? "Редактировать резюме"
                            : "Создать резюме"}

                      </button>
                        )}
                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full py-10">
                               Jo
                            </div>
                        </div>

                        {(userInfo && user?.userId === userInfo?.userId) && (
                            <>
                                <UserForm
                                    open={userDataOpen}
                                    setOpen={setUserDataOpen}
                                    userInfo={userInfo}
                                    onUserDataSubmit={onUserDataSubmit}
                                />
                                <ResumeForm
                                    open={resumeOpen}
                                    setOpen={setResumeOpen}
                                    resume={
                                        userInfo?.resumes?.lenght !== 0 ? userInfo?.resumes[0] : null
                                    }
                                    onUserResumeSubmit={onUserResumeSubmit}
                                />
                            </>
                        )}
                    </div>
                </>
            )}
            <ToastContainer/>
        </>
    );
};

export default UserProfile;