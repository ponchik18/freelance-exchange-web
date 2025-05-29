import React, {useState} from "react";
import {Message} from "./index";
import {useSelector} from "react-redux";

export default function Chat({messages, sender, recipient, sendMessage}) {
    const [newMessage, setNewMessage] = useState('');
    const {user} = useSelector((state) => state.user);

    const handleSendMessage = async () => {
        if (newMessage) {
            await sendMessage(newMessage);
        }
        setNewMessage('');
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
                    <img
                        src={recipient?.profilePicture}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full mr-2"/>
                    <h2 className="text-lg font-medium">{recipient?.lastName + ' ' + recipient?.firstName}</h2>
                </div>

                <div className="overflow-y-auto max-h-96 min-h-96">
                    {messages?.map(({message, senderId}) => (
                        <Message
                            isSender={senderId === user.userId}
                            message={message}
                            user={senderId === user.userId ? sender : recipient}/>
                    ))}
                </div>

                <div className="flex">
                    <input type="text"
                           value={newMessage}
                           onChange={(event) => setNewMessage(event.target.value)}
                           className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
                           placeholder="Ваше сообщение..."/>
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">Отправить
                    </button>
                </div>
            </div>
        </div>
    );
}