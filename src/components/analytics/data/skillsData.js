import React from "react";

export default function skillsData(skills) {
    if (!skills || skills.length === 0) {
        return [];
    }

    const SkillCard = ({skill}) => (
        <div className={"w-full h-16 flex gap-4 items-center justify-between"}>
            <div className='h-full flex flex-col'>
                <div
                    className='text-base md:text-lg font-semibold text-gray-600 truncate'
                >
                    {skill?.name}
                </div>
                <span className='text-sm text-blue-600'> {skill?.parent?.name}</span>
            </div>
        </div>
    );

    return skills.map(({skill, count, percent}) => {
        return {
            skill: (
                <SkillCard
                    skill={skill}
                />),
            count: (<div className="text-f-600 font-semibold">
                {count}
            </div>),
            percent: (<div className="text-f-600 font-semibold">
                {`${Number(percent * 100).toFixed(2)}%`}
            </div>),
        }
    })
}