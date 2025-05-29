import {Link} from "react-router-dom";
import React from "react";
import {jobStatuses} from "../../utils/data";

export default function freelancerJobAll(jobs) {
    if (!jobs || jobs.length === 0) {
        return [];
    }

    const StatusCard = ({color, text}) => (
        <div
            className={`${color} rounded-lg p-2`}>
            <p>
                {text}
            </p>
        </div>
    )

    const CustomerCard = ({cmp}) => (
        <div className={"w-full h-16 flex gap-4 items-center justify-between"}>
            <Link to={`/client-profile/${cmp?.userId}`}>
                <img
                    src={cmp?.profilePicture}
                    alt={cmp?.lastName + " " + cmp?.firstName}
                    className='w-8 md:w-12 h-8 md:h-12 rounded'
                />
            </Link>
            <div className='h-full flex flex-col'>
                <Link
                    to={`/client-profile/${cmp?.userId}`}
                    className='text-base md:text-lg font-semibold text-gray-600 truncate'
                >
                    {cmp?.lastName + " " + cmp?.firstName}
                </Link>
                <span className='text-sm text-blue-600'>{cmp?.email}</span>
            </div>
        </div>
    );

    return jobs.map(({id, customer, title, jobStatus, budget, createdAt}) => {
        const statusConf = jobStatuses[jobStatus];
        return {
            name: (
                <Link to={`/job-progress/${id}`}>
                    <div className="text-gray-700 font-medium text-sm">{title}</div>
                </Link>),
            customer: (<CustomerCard cmp={customer}/>),
            date: (<div className="text-gray-500 text-sm">
                {new Date(createdAt).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </div>),
            budget: (<div className="text-green-600 font-semibold">
                {`${budget.toLocaleString()} $`}
            </div>),
            jobStatus: (<StatusCard text={statusConf.name} color={statusConf.color}/>)
        }
    })
}