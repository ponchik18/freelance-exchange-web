import React from "react";
import {transactionCustomerStatuses} from "../../utils/data";
import {Link} from "react-router-dom";
import {FiArrowUpLeft} from "react-icons/fi";

export default function customerTransactionAll(transactions) {
    if (!transactions || transactions.length === 0) {
        return [];
    }

    const StatusCard = ({color, text}) => (
        <div
            className={`${color} rounded-lg p-2`}>
            <p>
                {text}
            </p>
        </div>
    )

    return transactions.map(({jobId, transactionStatus, amount, createdAt}) => {
        const statusConf = transactionCustomerStatuses[transactionStatus];
        const formattedAmount = new Intl.NumberFormat("ru-RU", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
        return {
            amount: (
                <span className={`font-bold`}>
                    {`${formattedAmount} $`}
                </span>
            ),
            date: (<div className="text-gray-500 text-sm">
                {new Date(createdAt).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}{" "}
                в{" "}
                {new Date(createdAt).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>),
            status: (<StatusCard text={statusConf.name} color={statusConf.color}/>),
            link: (
                <Link
                    to={`/job-progress/${jobId}`}
                >
                    <FiArrowUpLeft size={24}/>
                </Link>

            )
        }
    })
}