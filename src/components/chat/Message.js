import React from "react";

export default function Message({user, message, isSender}) {
    return (
        <div className={`${isSender? 'items-end justify-end': 'items-start'} flex mb-4`}>
            <img src={user?.profilePicture} alt="User Avatar"
                 className="w-8 h-8 rounded-full mr-2"/>
            <div className="bg-blue-200 rounded-lg p-2">
                <p className="text-sm">{message}</p>
            </div>
        </div>);
}