import React from 'react';
import { FaStar } from 'react-icons/fa';

const CommentList = ({ comments }) => {
    const renderStars = (rating) => {
        const filledStars = Array.from({ length: rating }, (_, index) => (
            <FaStar key={index} className="text-yellow-500" />
        ));
        const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
            <FaStar key={index} className="text-gray-400" />
        ));
        return [...filledStars, ...emptyStars];
    };

    return (
        <div className="mt-4">
            {comments?.length !== 0 ? (
                <>
                    <h2 className="text-lg font-bold mb-2">Отзывы</h2>
                    {comments?.map((comment, index) => (
                        <div key={index} className="border p-4 rounded-lg mb-2">
                            <p className="font-semibold">Комментарий: {comment.review}</p>
                            <p className="mt-2">
                                Рейтинг: <span className="flex">{renderStars(comment.rating)}</span>
                            </p>
                        </div>
                    ))}
                </>
            ) : (
                <h2 className="text-lg font-bold mb-2">Пока нет отзывов</h2>
            )}
        </div>
    );
};

export default CommentList;