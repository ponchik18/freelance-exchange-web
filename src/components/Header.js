import React from 'react';
import {AiOutlineCloseCircle, AiOutlineSearch} from "react-icons/ai";
import CustomButton from "./CustomButton";
import {popularSearch} from "../utils/data";

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
                onClick={props.
                    clearInput}
            />
        </div>
    );
}

const Header = (props) => {
    const {setSearchQuery, searchQuery, type, title, skills, skillIds, onClickSkill, clearInput} = props;
    return (
        <div className={'bg-[#f7fdfd'}>
            <div className={`container mx-auto px-5 ${type ? "h-[500px]" : "h-[350px]"} flex items-center relative`}>
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

                        {
                            type &&
                            <div className={'w-full lg:1/2 flex flex-wrap gap-3 md-gap-6 py-10 md:py-14'}>
                                {
                                    skills?.map((skill, index) => (
                                        <span key={index}
                                              onClick={() => onClickSkill(skill.id)}
                                              className={`${skillIds?.includes(skill.id)? 'bg-blue-300': 'bg-[#1d4fd826]'} text-[#1d4ed8] rounded-full py-1 px-2 text-sm md:text-base hover:underline cursor-pointer"`}>{skill.name}</span>
                                    ))
                                }
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;