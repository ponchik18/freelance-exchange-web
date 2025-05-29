import React from 'react';
import axios from 'axios';
import {getFile} from "../../axios/StorageService";

const DownloadJobCard = ({ jobReference }) => {

    const downloadFile = async () => {
        try {
            // Make GET request to the backend to download the file
            const response = await getFile(jobReference);


            // Create a URL from the response Blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;

            // Extract file name from the filePath (you can adjust it as needed)
            const fileName = jobReference?.substring(jobReference.lastIndexOf("/") + 1);
            link.setAttribute("download", fileName);

            // Trigger the download
            document.body.appendChild(link);
            link.click();

            // Clean up the URL object
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {

        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                <p className="text-gray-500">Ссылка на выполненный заказ будет тут.</p>
                {/* Trigger downloadFile function on link click */}
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();  // Prevent default link behavior
                        downloadFile();      // Call downloadFile function
                    }}
                    className="text-blue-500 hover:underline"
                >
                    Перейти на результаты работы
                </a>
            </div>
        </div>
    );
};

export default DownloadJobCard;
