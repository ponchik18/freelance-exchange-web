import React from 'react';
import {useForm} from "react-hook-form";

const SkillForm = ({onSubmit, skills}) => {
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange"
    });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select
                    {...register('skillId', { required: true })}
                    className="block w-full bg-white border border-gray-300 rounded-md py-2 px-4 mb-1">

                    { skills.map((skill)=> (
                        <option key={skill.id} value={skill.id}>{skill.name}</option>
                    ))}

                </select>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default SkillForm;