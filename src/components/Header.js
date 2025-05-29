import React, {useState} from 'react';
import {AiOutlineCloseCircle, AiOutlineSearch} from "react-icons/ai";

function SearchInput(props) {
    const handleChange = (e) => {
        if (e) {
            props.setValue(e.target.value);
        }
    };

    return (
        <div className={`flex w-full items-center ${props.styles}`}>
            {props.icon}
            <input
                placeholder={props.placeholder}
                value={props.value}
                className={'w-full outline-none bg-transparent text-base'}
                onChange={handleChange}
            />
            <AiOutlineCloseCircle
                className={'hidden md:flex text-gray-600 text-xl cursor-pointer'}
                onClick={props.clearInput}
            />
        </div>
    );
}

const Header = (props) => {
    const {setSearchQuery, searchQuery, title, skills, skillIds, onClickSkill, clearInput, type} = props;

    const [selectedParent, setSelectedParent] = useState(null);  // Состояние для выбранной родительской категории
    const [selectedSkills, setSelectedSkills] = useState([]);  // Состояние для выбранных скилов

    // Функция для изменения выбранной родительской категории
    const handleSelectParent = (parentId) => {
        setSelectedParent(parentId);
        // setSelectedSkills([]); // Сбрасываем выбранные скилы при смене категории
    };

    // Функция для добавления или удаления скилов из выбранных
    const handleToggleSkill = (skillId) => {
        setSelectedSkills((prev) =>
            prev.includes(skillId)
                ? prev.filter((id) => id !== skillId)
                : [...prev, skillId]
        );
        onClickSkill(skillId);
    };

    // Фильтруем скилы по выбранной родительской категории
    const filteredSkills = skills?.filter(category => category.parentSkill.id === selectedParent);

    return (
        <div className={'bg-[#f7fdfd]'}>
            <div className={`container mx-auto px-5 ${type ? "h-[400px]" : "h-[350px]"} flex items-center relative`}>
                <div className={'w-full z-10'}>
                    <div className={'mb-8'}>
                        <p className={'text-slate-800 font-bold text-4xl'}>
                            {title}
                        </p>
                        <div
                            className={'w-full flex items-center justify-around bg-white bz-2 md:px-5 py-2.5 md:py-6 shadow-2xl rounded-full'}>
                            <SearchInput
                                placeholder={'Введите описание заказа'}
                                icon={<AiOutlineSearch className={'text-gray-600 text-xl'}/>}
                                value={searchQuery}
                                setValue={setSearchQuery}
                                clearInput={clearInput}
                            />
                        </div>

                        {skills && (
                            <>
                                {selectedSkills?.length !== 0 && (
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-lg">Выбранные навыки:</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedSkills?.map((skillId) => {
                                                const skill = skills
                                                    .flatMap(category => category.skills)
                                                    .find(skill => skill.id === skillId);
                                                return (
                                                    skill && (
                                                        <span
                                                            key={skill.id}
                                                            onClick={() => handleToggleSkill(skill.id)}
                                                            className="bg-blue-300 text-[#1d4ed8] rounded-full py-1 px-2 text-sm md:text-base cursor-pointer"
                                                        >
                                                {skill.name} <span className="text-red-500">X</span>
                                            </span>
                                                    )
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Выбор родительской категории */}
                                <div className="mb-4">
                                    <h3 className="font-semibold text-lg">Выберите категорию:</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {skills?.map((category) => (
                                            <span
                                                key={category.parentSkill.id}
                                                onClick={() => handleSelectParent(category.parentSkill.id)}
                                                className={`${
                                                    selectedParent === category.parentSkill.id
                                                        ? 'bg-blue-300'
                                                        : 'bg-[#1d4fd826]'
                                                } text-[#1d4ed8] rounded-full py-1 px-2 text-sm md:text-base hover:underline cursor-pointer`}
                                            >
                                        {category.parentSkill.name}
                                    </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Отображаем скилы для выбранной категории */}
                                {selectedParent && (
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-lg">Выберите навыки:</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {filteredSkills?.flatMap(category =>
                                                    category.skills
                                                        .filter(({id})=> !skillIds.includes(id))
                                                        .map((skill) => (
                                                        <span
                                                            key={skill.id}
                                                            onClick={() => handleToggleSkill(skill.id)}
                                                            className={` bg-[#1d4fd826] text-[#1d4ed8] rounded-full py-1 px-2 text-sm md:text-base hover:underline cursor-pointer`}
                                                        >
                                                            {skill.name}
                                                         </span>
                                                    ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
