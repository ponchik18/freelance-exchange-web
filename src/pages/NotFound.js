import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-lg text-gray-600 mb-8">
                Oops! Данной страницы не существует.
            </p>
            <Link
                to="/find-jobs"
                className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600"
            >
                Вернуться на главную
            </Link>
        </div>
    );
};

export default NotFound;
