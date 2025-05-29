import React, {useState} from 'react';
import {useForm} from "react-hook-form";

const SkillForm = ({onSubmit, skills, selectedSkills}) => {
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: {errors},
    } = useForm({
        mode: "onChange"
    });

    const [selectedParent, setSelectedParent] = useState(null);  // Состояние для выбранной родительской категории
    const filteredSkills = skills?.filter(category => category.parentSkill.id === selectedParent);

    // Функция для изменения выбранной родительской категории
    const handleSelectParent = (parentId) => {
        setSelectedParent(parentId);
    };

    return (
        <>
            <div className="mb-4">
                <h3 className="font-semibold text-lg">Выберите категорию:</h3>
                <div className="flex flex-wrap gap-3">
                    {skills?.map((category) => (
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
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select
                        {...register('skillId', {required: true})}
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 px-4 mb-1">
                        {filteredSkills?.flatMap(category =>
                            category.skills
                                .filter((skill)=> !selectedSkills.includes(skill))
                                .map((skill) => (
                            <option key={skill.id} value={skill.id}>{skill.name}</option>
                                ))
                        )}

                    </select>
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Добавить
                    </button>
                </form>
            </div>
        </>
    );
};

export default SkillForm;