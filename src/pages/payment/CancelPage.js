import React from "react";
import {useNavigate, useParams} from "react-router-dom";

const FailurePage = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const handleRedirect = () => {
        navigate("/job-progress/"+id); // Укажите путь, куда перенаправлять пользователя для повторной оплаты
    };

    return (
        <div className="bg-red-50 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Оплата не удалась</h1>
                <p className="text-gray-600 text-lg mb-6">
                    К сожалению, что-то пошло не так. Проверьте данные вашей карты или попробуйте еще раз.
                </p>
                <button
                    onClick={handleRedirect}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg"
                >
                    Вернуться к заказу
                </button>
            </div>
        </div>
    );
};

export default FailurePage;
