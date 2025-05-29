import DataTable from "react-data-table-component";
import React, {useEffect, useState} from "react";
import {generateSkillsForAnalytics} from "../../axios/JobService";
import skillsData from "./data/skillsData";

export default function SkillsOverview() {
    const [data, setData] = useState([]);
    const columns = [
        {name: "Нывык", selector: (row) => row.skill},
        {name: "Количество указаний", selector: (row) => row.count},
        {name: "Процент указаний", selector: (row) => row.percent},
    ];

    useEffect(() => {
        async function fetchSkillsData() {
            try {
                const response = await generateSkillsForAnalytics();
                setData(skillsData(response.data))
            } catch (error){}
        }
        fetchSkillsData()
    }, []);

    return (
        <div>
            <h5 className="text-2xl font-bold mb-4">Аналитика по навыкам и их частоте указаний в заказах</h5>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-b">
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover
                    striped
                    noDataComponent={<p className="text-gray-500">Заказов не найдено</p>}
                />
            </div>
        </div>
    )
}