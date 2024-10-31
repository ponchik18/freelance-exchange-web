import React from 'react';

const CustomButton = (props) => {
    const {title, type, onClick, containerStyles, iconRight} = props;
    return <button
        onClick={onClick}
        type={type || "button"}
        className={`inline-flex items-center ${containerStyles}`}
    >
        {title}

        {iconRight && <div className='ml-2'>{iconRight}</div>}
    </button>
};

export default CustomButton;