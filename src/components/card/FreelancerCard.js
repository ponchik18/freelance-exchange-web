import React from "react";
import {Link} from "react-router-dom";
import moment from "moment/moment";

const FreelancerCard = ({proposal, onApprove, onReject, onMessage, onStartWork, jobId}) => {
    return (
        <div className='w-full flex gap-4 items-center justify-between bg-white shadow-md rounded'>
            <div className='w-3/4 md:w-2/4 flex gap-4 items-center'>
                <Link to={`/user-profile/${proposal?.freelancer?.userId}`}>
                    <img
                        src={proposal?.freelancer?.profilePicture}
                        alt={proposal?.freelancer?.lastName + " " + proposal?.freelancer?.firstName}
                        className='w-8 md:w-12 h-8 md:h-12 rounded'
                    />
                </Link>
                <div className='h-full flex flex-col'>
                    <Link
                        to={`/user-profile/${proposal?.freelancer?.userId}`}
                        className='text-base md:text-lg font-semibold text-gray-600 truncate'
                    >
                        {proposal?.freelancer?.lastName + " " + proposal?.freelancer?.firstName}
                    </Link>
                    <span className='text-sm text-blue-600'>{proposal?.freelancer?.email}</span>
                    <span className='text-sm text-gray-600'>CV: {proposal?.coveringLetter}</span>
                    <span className='text-sm text-gray-600'>Предлагаемый бюджет: {proposal?.suggestedBudget} $</span>
                    <br/>
                    <span className='text-gray-500 text-sm'>
                        {moment(proposal?.createdAt).fromNow()}
                      </span>
                </div>
            </div>

            <div className='w-1/4 h-full flex flex-col gap-4 m-1 items-center'>
                {(proposal?.status === 'CREATED') ? (<>
                        <button
                            onClick={() => onReject(proposal.id)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                            Отказ
                        </button>

                        <button
                            onClick={() => onApprove(proposal.id)}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            Подтвердить
                        </button>
                    </>
                ): (proposal?.status === 'ACCEPTED') ? (
                    <button
                        onClick={()=>onStartWork(jobId)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        Начать работу
                    </button>
                ): (
                    <span className={"w-full bg-red-500 text-white font-bold py-2 px-4 rounded"}>
                        Отказано
                    </span>
                )}
            </div>
        </div>
    );
};

export default FreelancerCard;