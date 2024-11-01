import React from 'react';
import {Link} from "react-router-dom";

const Error404 = ({title, description, redirectUrl, redirectUrlTitle}) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                <p className="text-gray-600 mt-4">{description}</p>
                <Link to={redirectUrl} className="text-blue-500 mt-4 inline-block">{redirectUrlTitle}</Link>
            </div>
        </div>
    );
};

export default Error404;