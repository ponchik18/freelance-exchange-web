// src/components/SkillsTable.js
import React, {useEffect, useState} from 'react';
import {addSkill, getAllSkills} from "../../axios/SkillService";
import {useKeycloak} from "@react-keycloak/web";

const SkillsTable = () => {


    const [skills, setSkills] = useState([]);
    const [newSkillName, setNewSkillName] = useState('');
    const {keycloak} = useKeycloak();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllSkills()
            setSkills(response.data);
        }
        fetchData()
    }, []);

    const handleAddSkill = async () => {
        if (keycloak.authenticated) {
            keycloak.updateToken(10).then(async () => {
                if (newSkillName.trim() === '') return; // Prevent adding empty skill name
                const response = await addSkill({name: newSkillName}, keycloak.token);
                setSkills([...skills, response.data]);
                setNewSkillName('');
            })
        }
    };

    return (
        <div className="w-full">
            <div className="max-w-screen-lg mx-auto">
                <h2 className="text-xl font-semibold mb-4">Навыки</h2>
                <table className="w-full table-auto">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {skills.map((skill) => (
                        <tr key={skill.id}>
                            <td className="border px-4 py-2">{skill.id}</td>
                            <td className="border px-4 py-2">{skill.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="mt-4 flex">
                    <input
                        type="text"
                        className="border px-4 py-2 mr-2 w-full"
                        placeholder="Enter skill name"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                    />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddSkill}>
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillsTable;