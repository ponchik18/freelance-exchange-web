import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineMail } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { getAllJobsForFreelancer } from "../axios/JobService";
import { toast } from "react-toastify";
import { freelancerJobAll } from "../components/table";
import {SkillsOverview} from "../components/analytics";

const FreelancerJobs = () => {
    const { user } = useSelector((state) => state.user || {});
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState("all");

    const columns = [
        { name: "Название", selector: (row) => row.name },
        { name: "Покупатель", selector: (row) => row.customer },
        { name: "Дата создания", selector: (row) => row.date, width: "15%" },
        { name: "Бюджет", selector: (row) => row.budget, width: "7%" },
        { name: "Статус", selector: (row) => row.jobStatus, width: "18%" },
    ];

    const generateTabs = (jobs) => [
        { id: "created", label: "Отклик", count: jobs?.createdJobs?.length || 0 },
        { id: "worked", label: "В работе", count: jobs?.workedJobs?.length || 0 },
        { id: "finish", label: "Ожидают оплаты", count: jobs?.finishJobs?.length || 0 },
        { id: "paid", label: "Завершено", count: jobs?.paidJobs?.length || 0 },
        { id: "cancelled", label: "Отменено", count: jobs?.cancelledJobs?.length || 0 },
        { id: "all", label: "Все", count: jobs?.allJobs?.length || 0 },
    ];

    useEffect(() => {
        const fetchJobs = async () => {
            if (!user?.userId) {
                toast.error("Пользователь не авторизован!");
                return;
            }

            setIsLoading(true);
            try {
                const response = await getAllJobsForFreelancer(user.userId);
                const jobs = response.data;

                setTabs(generateTabs(jobs));
                setData({
                    created: freelancerJobAll(jobs?.createdJobs || []),
                    worked: freelancerJobAll(jobs?.workedJobs || []),
                    finish: freelancerJobAll(jobs?.finishJobs || []),
                    paid: freelancerJobAll(jobs?.paidJobs || []),
                    cancelled: freelancerJobAll(jobs?.cancelledJobs || []),
                    all: freelancerJobAll(jobs?.allJobs || []),
                });
            } catch (error) {
                toast.error("Ошибка получения данных!");
            }
            setIsLoading(false);
        };

        fetchJobs();
    }, [user?.userId]);

    return (
        <div className="container mx-auto p-5">
            <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
                <h2 className="text-gray-600 text-xl font-semibold">
                    {user?.lastName} {user?.firstName}
                </h2>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-start mt-4 text-sm">
                <p className="flex gap-1 items-center px-3 py-1 text-slate-600 rounded-full">
                    <AiOutlineMail /> {user?.email ?? "No Email"}
                </p>
            </div>
            <div className="w-full mt-20 flex flex-col gap-2">
                <h5 className="text-2xl font-bold mb-4">Список ваших заказов</h5>
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
                        noDataComponent={<p className="text-gray-500">Заказов не найдено</p>}
                    />
                </div>
            </div>
        </div>
    );
};

export default FreelancerJobs;
