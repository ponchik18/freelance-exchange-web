import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AiOutlineMail} from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import {toast, ToastContainer} from "react-toastify";
import {createPayout, getBalance, getCustomerTransactionHistory, getTransactionHistory} from "../axios/PaymentService";
import freelancerTransactionAll from "../components/table/freelancerTransactionAll";
import UserBalance from "../components/user/UserBalance";
import PayoutForm from "../components/form/PayoutForm";
import customerTransactionAll from "../components/table/customerTransactionAll";

const CustomerTransaction = () => {
    const {user, token} = useSelector((state) => state.user || {});
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [balance, setBalance] = useState(null);

    const columns = [
        {name: "Cумма", selector: (row) => row.amount},
        {name: "Дата создания", selector: (row) => row.date,},
        {name: "Статус", selector: (row) => row.status},
        {name: "Перейти к заказу", selector: (row) => row.link},
    ];

    const generateTabs = (transactions) => [
        {
            id: "created",
            label: "В процессе",
            count: transactions?.filter(({transactionStatus}) => transactionStatus === 'CREATED')?.length || 0
        },
        {
            id: "rejected",
            label: "Отклонённые",
            count: transactions?.filter(({transactionStatus}) => transactionStatus === 'REJECTED')?.length || 0
        },
        {
            id: "finish",
            label: "Успешные",
            count: transactions?.filter(({transactionStatus}) => transactionStatus === 'FINISHED')?.length || 0
        },
        {id: "all", label: "Все", count: transactions.length || 0},
    ];

    const fetchTransactions = async () => {
        if (!user?.userId) {
            toast.error("Пользователь не авторизован!");
            return;
        }

        setIsLoading(true);
        try {
            const response = await getCustomerTransactionHistory(user.userId, token);
            const transactions = response.data;

            setTabs(generateTabs(transactions));
            setData({
                'created': customerTransactionAll(transactions?.filter(({transactionStatus}) => transactionStatus === 'CREATED') || []),
                rejected: customerTransactionAll(transactions?.filter(({transactionStatus}) => transactionStatus === 'REJECTED') || []),
                finish: customerTransactionAll(transactions?.filter(({transactionStatus}) => transactionStatus === 'FINISHED') || []),
                all: customerTransactionAll(transactions || []),
            });
            setBalance(
                transactions?.filter(({transactionStatus}) => transactionStatus === 'FINISHED')
                    .map(({amount}) => Number(amount))
                    .reduce((acc, amount) => acc + amount, 0)
            )
        } catch (error) {
            toast.error("Ошибка получения данных!");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTransactions();
    }, [user?.userId]);


    return (
        <div className="container mx-auto p-5">

            <div className="w-full flex flex-col md:flex-row justify-between mt-4 text-sm">
                <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
                    <div>
                        <h2 className="text-gray-600 text-xl font-semibold">
                            {user?.lastName} {user?.firstName}
                        </h2>
                        <p className="flex gap-1 items-center px-3 py-1 text-slate-600 rounded-full">
                            <AiOutlineMail/> {user?.email ?? "No Email"}
                        </p>
                    </div>
                </div>
                {balance && (
                    <div className="flex flex-col md:flex-row justify-end">
                        <UserBalance
                            title={"Всего потрачено:"}
                            balance={balance}
                        />
                    </div>
                )}
            </div>

            <div className="w-full mt-20 flex flex-col gap-2">
                <div className={"flex flex-col md:flex-row gap-3 justify-between"}>
                    <h5 className="text-2xl font-bold mb-4">Список ваших транзакций</h5>
                </div>
                <div className="flex border-b border-gray-300">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-3 text-center font-medium ${
                                activeTab === tab.id
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-blue-600"
                            }`}
                        >
                            {tab.label}{" "}
                            <span
                                className={`text-sm px-2 py-1 rounded-full ${
                                    activeTab === tab.id
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-gray-100 text-gray-500"
                                }`}
                            >
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-b">
                    <DataTable
                        columns={columns}
                        data={data[activeTab] || []}
                        pagination
                        highlightOnHover
                        striped
                        noDataComponent={<p className="text-gray-500">Транзакций не найдено</p>}
                    />
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default CustomerTransaction;
