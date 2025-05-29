import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import {useKeycloak} from "@react-keycloak/web";
import {createProposal} from "../../axios/ProposalService";
import {toast} from "react-toastify";
import {saveRating} from "../../axios/RatingService";

const RatingForm = ( {userId, job, fetchRating}) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const {keycloak} = useKeycloak();

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleRatingHover = (value) => {
        setHoverRating(value);
    };

    const saveRatingHandle = async (event) => {
        event.preventDefault()
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {

                const response = await saveRating({
                    rating: Number(rating),
                    toUser: userId,
                    fromUser: keycloak?.tokenParsed?.sub,
                    review: comment,
                    jobId: job.id

                }, keycloak?.token);
                if (response.status === 201) {
                    toast.success("Операция проведена успешно!");
                    fetchRating(job);
                } else {
                    toast.error("Ошибка!");
                }
            });
        }
    }

    return (
        <form onSubmit={event=>saveRatingHandle(event)} className="max-w-md mx-auto mt-4">
      <textarea
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
          rows="4"
          placeholder="Оставьте свои отзыв"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
      ></textarea>
            <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <label key={index}>
                            <input
                                className={'hidden'}
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => handleRatingClick(ratingValue)}
                            />
                            <FaStar
                                className="cursor-pointer ml-1"
                                size={25}
                                color={(hoverRating || rating) > index ? '#ffc107' : '#e4e5e9'}
                                onMouseEnter={() => handleRatingHover(ratingValue)}
                                onMouseLeave={() => handleRatingHover(0)}
                            />
                        </label>
                    );
                })}
            </div>
            <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
            >
                Отправить
            </button>
        </form>
    );
};

export default RatingForm;