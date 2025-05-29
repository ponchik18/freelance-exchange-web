import moment from "moment";
import 'moment/locale/ru';
import { Link } from "react-router-dom";
import { SkillList } from "../index";

const JobCard = ({ userData, job }) => {
    moment.locale('ru');
    return (
        <Link to={`/job-detail/${job?.id}`}>
            <div className='w-full md:w-[16rem] 2xl:w-[18rem] h-[25rem] bg-white flex flex-col justify-between shadow-lg rounded-md p-4'>

                {/* User info */}
                <div className='flex gap-3 mb-4'>
                    <img
                        src={userData?.profilePicture}
                        alt={userData?.lastName + ' ' + userData?.firstName}
                        className='w-14 h-14'
                    />
                    <div>
                        <p className='text-lg font-semibold truncate'>{job?.title}</p>
                    </div>
                </div>

                {/* Job Description */}
                <div className='py-2'>
                    <p className='text-sm' dangerouslySetInnerHTML={{ __html: job?.description?.slice(0, 150) + "..." }} />
                </div>

                {/* Skill List */}
                <div className='flex flex-wrap gap-1 mb-3'>
                    <SkillList skills={job?.skills} />
                </div>

                {/* Time */}
                <span className='text-gray-500 text-sm'>
          {moment(job?.createdAt).fromNow()}
        </span>

                {/* Budget */}
                <div className='flex justify-end mt-2'>
          <span className='text-black text-lg font-bold'>
            Бюджет: {job?.budget?.toFixed(2)} $
          </span>
                </div>

            </div>
        </Link>
    );
};

export default JobCard;
