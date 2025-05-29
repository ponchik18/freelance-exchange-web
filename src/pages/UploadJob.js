import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {CustomButton, JobCard, SkillList, TextInput} from "../components";
import {Editor} from "@tinymce/tinymce-react";
import "react-toastify/dist/ReactToastify.css";
import "../css/reset-tailwind-css.css";
import {getAllJobsForCustomer, uploadJob} from "../axios/JobService";
import {useSelector} from "react-redux";
import {getAllSkills} from "../axios/SkillService";
import {RotatingLines} from "react-loader-spinner";
import {useKeycloak} from "@react-keycloak/web";

const UploadJob = () => {
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        formState: {errors},
    } = useForm({
        mode: "onChange",
        defaultValues: {},
    });
    const [errMsg, setErrMsg] = useState("");
    const [jobSkills, setJobSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const {keycloak} = useKeycloak();
    const {user, token} = useSelector((state) => state.user);
    const [jobs, setJobs] = useState([]);
    const [selectedSkillValue, setSelectedSkillValue] = useState('1');
    const [isLoading, setIsLoading] = useState(false);
    const [filteredSkills, setFilteredSkills] = useState()

    const [selectedParent, setSelectedParent] = useState(null);  // Состояние для выбранной родительской категории

    useEffect(() => {
        setFilteredSkills(
            allSkills?.filter(category => category.parentSkill.id === selectedParent)
        )
    }, [selectedParent]);

    const handleSelectChange = (event) => {
        setSelectedSkillValue(event.target.value);
    };
    const handleSelectParent = (parentId) => {
        setSelectedParent(parentId);
    };
    useEffect(() => {
        const fetchUserJobs = async () => {
            const userId = user?.userId
            if (userId) {
                const jobsData = await getAllJobsForCustomer(userId);
                setJobs(jobsData.data);
                const response = await getAllSkills()
                setAllSkills(response.data);
                // setSelectedSkillValue(response.data[0].id)
            }
        };
        fetchUserJobs()
    }, [user]);
    const onSubmit = async (data) => {
                setIsLoading(true)
                if (jobSkills && jobSkills?.length !== 0) {
                    data.skills = jobSkills.map((skill) => skill.id);
                }
                try {
                    const response = await uploadJob(data, token)
                    setIsLoading(false)
                    window.location.href = '/job-detail/' + response.data.id;
                } catch (error) {
                    const errResponse = error?.response;
                    if (errResponse) {
                        setErrMsg(errResponse.data.message)
                    } else {
                        setErrMsg("Ошибка создания объявления!")
                    }
                    setIsLoading(false)
                }
    };
    const onSelectSkill = () => {
        if (selectedSkillValue) {
            const selectedSkillIndex = filteredSkills[0].skills.findIndex((skill) => skill.id == selectedSkillValue);
            if (selectedSkillIndex !== -1) { // Check if skill is found
                const selectedSkill = filteredSkills[0].skills[selectedSkillIndex];
                // const updatedAllSkills = filteredSkills.filter((_, index) => index !== selectedSkillIndex); // Create a new array without the selected skill
                // setAllSkills(updatedAllSkills);
                setJobSkills([...jobSkills, selectedSkill]); // Add selected skill to jobSkills using spread operator to create a new array
                //setSelectedSkillValue(allSkills[0]?.id)
            }
        }
    };

    const onDeleteSkill = (skillId) => {
        const selectedSkillIndex = jobSkills.findIndex((skill) => skill.id === skillId);
        if (selectedSkillIndex !== -1) { // Check if skill is found
            const selectedSkill = jobSkills[selectedSkillIndex];
            const updatedJobSkills = jobSkills.filter((_, index) => index !== selectedSkillIndex); // Create a new array without the selected skill
            setJobSkills(updatedJobSkills);
            //setAllSkills([...allSkills, selectedSkill]); // Add selected skill to allSkills using spread operator to create a new array
        }
    };


    return (
        <div className='container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5'>
            <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
                <div>
                    <p className='text-gray-500 font-semibold text-2xl'>Публикация работы</p>

                    <form
                        className='w-full mt-2 flex flex-col gap-8'
                        onSubmit={handleSubmit(onSubmit)}

                    >
                        <TextInput
                            name='title'
                            label='Краткое название'
                            placeholder='Разработать веб-сайт для продажи книг'
                            type='text'
                            required={true}
                            register={register("title", {
                                required: "Краткое название не указано!",
                            })}
                            error={errors.title ? errors.title?.message : ""}
                        />

                        <TextInput
                            name='budget'
                            label='Бюджет на работу($)'
                            placeholder='500'
                            type='number'
                            register={register("budget", {
                                required: "Бюджет не указан!",
                            })}
                            error={errors.budget ? errors.budget?.message : ""}
                        />
                        <div className="container mx-auto mt-1">
                            <h1 className="text-center text-2xl font-bold mb-1">Необходимые навыки для работы</h1>
                            <div className="flex justify-center">
                                <div className={'w-full lg:1/2 flex flex-wrap gap-3 md-gap-6 py-10 md:py-14'}>
                                    <SkillList skills={jobSkills} handleDeleteSkill={onDeleteSkill}/>
                                </div>
                            </div>
                        </div>
                        {allSkills?.length !== 0 && (
                            <>
                                <div className="mb-4">
                                    <h3 className="font-semibold text-lg">Выберите категорию:</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {allSkills?.map((category) => (
                                            <span
                                                key={category.parentSkill.id}
                                                onClick={() => handleSelectParent(category.parentSkill.id)}
                                                className={`${
                                                    selectedParent === category.parentSkill.id
                                                        ? 'bg-blue-300'
                                                        : 'bg-[#1d4fd826]'
                                                } text-[#1d4ed8] rounded-full py-1 px-2 text-sm md:text-base hover:underline cursor-pointer`}
                                            >
                                        {category.parentSkill.name}
                                    </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <select
                                        value={selectedSkillValue}
                                        onChange={handleSelectChange}
                                        className="block w-full bg-white border border-gray-300 rounded-md py-2 px-4 mb-1">

                                        {filteredSkills?.flatMap(category =>
                                            category.skills
                                                .filter((skill) => !jobSkills.includes(skill))
                                                .map((skill) => (
                                                    <option key={skill.id} value={skill.id}>{skill.name}</option>
                                                ))
                                        )}

                                    </select>
                                    <button type="button"
                                            onClick={onSelectSkill}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Добавить
                                    </button>
                                </div>
                            </>
                        )}
                        <Editor
                            apiKey="5148pjlmnfcneinm2w3kc57up57dvqixvv6x2ufa55295y8k"
                            onEditorChange={(description) => {
                                register("description", {value: description});
                                setValue("description", description);
                            }}
                            // initialValue={resume?.resumeContent}
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

                        {errMsg && (
                            <span role='alert' className='text-sm text-red-500 mt-0.5'>
                {errMsg}
              </span>
                        )}
                        <div className='mt-2'>
                            <CustomButton
                                type='Загрузить'
                                containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                                title='Загрузить'
                            />
                            {isLoading && (
                                <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="96"
                                    visible={true}
                                />
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <div className='w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0'>
                <p className='text-gray-500 font-semibold'>Недавние объявления</p>

                <div className='w-full flex flex-wrap gap-6'>
                    {jobs.slice(0, 2).map((job, index) => {
                        return <JobCard userData={user} job={job} key={index}/>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default UploadJob;