import moment from "moment";
import {Link} from "react-router-dom";
import {SkillList} from "../index";

const JobCard = ({userData, job}) => {
    moment.locale('ru');
    return (
        <Link to={`/job-detail/${job?.id}`}>
            <div
                className='w-full md:w-[16rem] 2xl:w-[18rem] h-[35rem] md:h-[35rem] bg-white flex flex-col justify-between shadow-lg
                rounded-md px-3 py-5 '
            >
                <div className='flex gap-3'>
                    <img
                        src={userData?.profilePicture}
                        alt={userData?.lastName + ' ' + userData?.firstName}
                        className='w-14 h-14'
                    />

                    <div className=''>
                        <p className='text-lg font-semibold truncate whitespace-normal break-words'>{job?.title}</p>
                        <span className='flex gap-2 items-center'>
            </span>
                    </div>
                </div>

                <div className='py-3'>
                    <p className='text-sm' dangerouslySetInnerHTML={{__html: job?.description?.slice(0, 150) + "..."}}/>
                </div>

                <div className='flex flex-wrap gap-3'>
                    <SkillList skills={job?.skills}/>
                </div>
                <span className='text-gray-500 text-sm'>
                        {moment(job?.createdAt).fromNow()}
                      </span>
                <div className='flex justify-end mt-3'>
                  <span className='text-black text-lg font-bold'>
                    Бюджет: {job?.budget?.toFixed(2)} $
                  </span>
                </div>
            </div>
        </Link>
    );
};

export default JobCard;