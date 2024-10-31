// src/components/Card.js
import React from 'react';

const Card = ({ title, count }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 text-lg">{count}</p>
        </div>
    );
};

export default Card;