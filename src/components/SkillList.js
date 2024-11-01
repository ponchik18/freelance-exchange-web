import React from 'react';

const SkillList = ({skills, handleDeleteSkill}) => {
    return (
        <>
            {skills?.length !== 0 && (
                skills.map((skill, index) => (
                    <div key={skill.id} className="flex justify-center bg-blue-500 rounded-full py-1 px-2">
                    <span
                        className="text-white text-sm md:text-base m-1"
                    >
                        {skill.name}
                    </span>
                        {handleDeleteSkill && (
                            <button
                                type={'button'}
                                key={skill.id + 'button'}
                                onClick={() => handleDeleteSkill(skill.id)}
                                className="h-4 w-4 bg-red-500 rounded-full text-white flex items-center justify-center focus:outline-none"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                ))
            )}
            {skills?.length === 0 && (
                <div className="flex justify-center">
                    <p className='text-sm md:text-base'>
                        Тут пусто...
                    </p>
                </div>
            )}
        </>
    );
};

export default SkillList;