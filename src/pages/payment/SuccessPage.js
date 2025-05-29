import React from "react";
import {useNavigate, useParams} from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const handleRedirect = () => {
        navigate("/job-progress/"+id); // Укажите путь, куда перенаправлять пользователя
    };

    return (
        <div className="bg-green-50 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Оплата прошла успешно!</h1>
                <p className="text-gray-600 text-lg mb-6">
                    Спасибо за то, что выбрали нашу платформу.
                </p>
                <button
                    onClick={handleRedirect}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg"
                >
                    Вернуться к заказу
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
