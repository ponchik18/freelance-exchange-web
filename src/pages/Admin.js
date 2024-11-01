import React from 'react';
import Dashboard from "../components/admin/Dashboard";
import RevenueChart from "../components/admin/RevenueChart";
import TaskStatusPieChart from "../components/admin/TaskStatusPieChart";
import SkillsTable from "../components/admin/SkillsTable";

const Admin = () => {
    return (
        <div className='container mx-auto p-5'>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="container mx-auto mb-8 md:mb-0">
                    <h1 className="text-3xl font-bold mb-8">Статистика</h1>
                    <Dashboard/>
                </div>
            </div>
            <div className="flex flex-col mt-8 md:flex-row gap-6">
                <SkillsTable/>
            </div>
            <div className="flex flex-col mt-8 md:flex-row gap-6">
                <div className="container mx-auto">
                    <RevenueChart/>
                </div>
                <div className="container mx-auto">
                    <TaskStatusPieChart/>
                </div>
            </div>
        </div>
    );
};

export default Admin;