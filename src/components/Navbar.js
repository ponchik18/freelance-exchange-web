import React, {Fragment, useEffect, useState} from "react";
import {Menu, Transition} from "@headlessui/react";
import {BiChevronDown} from "react-icons/bi";
import {CgProfile} from "react-icons/cg";
import {AiOutlineLogout} from "react-icons/ai";
import {Link} from "react-router-dom";
import CustomButton from "./CustomButton";
import {logout} from "../helpers/auth_helpers_logout";
import {useSelector} from "react-redux";
import {adminRoutes, customerRoutes, freelancerRoutes, publicRoutes} from "../routes";
import {getBalance} from "../axios/PaymentService";

function MenuList(props) {
    const {user, onClick, onLogout, balance} = props;

    return (
        <div>
            <Menu as="div" className="inline-block text-left">
                <div className="flex">
                    <Menu.Button
                        className="inline-flex gap-2 w-full
                    rounded-md bg-white md:px-4 py-2 text-sm font-medium
                     text-slate-700 hover:bg-opacity-20"
                    >
                        <div className="leading[80px] flex flex-col items-start">
                            <p className="text-sm font-semibold">
                                {user?.firstName + " " + user?.lastName}
                            </p>
                            <span className="text-sm text-blue-600">
                {user?.jobTitle ?? user?.email}
              </span>
                            {balance && (
                                <span className="text-sm text-blue-600">
                  {'На счету: ' + balance + " $"}
                </span>
                            )}
                        </div>
                        <img
                            src={user?.profilePicture}
                            alt={"user profile"}
                            className={"w-10 h-10 rounded-full object-cover"}
                        />
                        <BiChevronDown
                            className={"h-8 w-8 text-slate-600"}
                            aria-hidden={"true"}
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter={"transition ease-out duration-100"}
                    enterFrom={"transform opacity-0 scale-95"}
                    enterTo={"transform opacity-100 scale-100"}
                    leave={"transition ease-in duration-75"}
                    leaveFrom={"transform opacity-100 scale-100"}
                    leaveTo={"transform opacity-0 scale-95"}
                >
                    <Menu.Items
                        className={
                            "absolute z-50 right-2 mt-2 w-56" +
                            " origin-top-right divide-y dividfe-gray-100 rounded-md bg-white" +
                            " shadow-lg focus:outline-none"
                        }
                    >
                        <div className={"p-1"}>
                            <Menu.Item>
                                {({active}) => (
                                    <Link
                                        to={`${
                                            user?.role === "FREELANCER"
                                                ? "user-profile" :
                                                user?.role === "CUSTOMER" ? "client-profile" : "admin"
                                        }`}
                                        className={`${
                                            active ? "bg-blue-500 text-white" : "text-gray-900"
                                        } group flex w-full items-center
                                                rounded-md p-2 text-sm`}
                                        onClick={onClick}
                                    >
                                        <CgProfile
                                            className={`${
                                                active ? "text-white" : "text-gray-600"
                                            } mr-2 h-5 w-5`}
                                            aria-hidden={"true"}
                                        />
                                        Профиль
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        onClick={onLogout}
                                        className={`${
                                            active ? "bg-blue-500 text-white" : "text-gray-900"
                                        }
                                            group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <AiOutlineLogout
                                            className={`${
                                                active ? "text-white" : "text-gray-600"
                                            } mr-2 h-5 w-5`}
                                            aria-hidden={"true"}
                                        />
                                        Выход
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

const Navbar = ({isOpen, setIsOpen}) => {
    const {user, token} = useSelector((state) => state.user);
    const [balance, setBalance] = useState()
    const handleClosedNavbar = () => {
        setIsOpen((prev) => !prev);
    };
    const onLogout = () => {
        logout();
    };

    useEffect(() => {
       async function getBalanceUser() {
           if(user?.role === 'FREELANCER') {
               const balanceData = await getBalance(user.userId, token)
               setBalance(balanceData.data.balance.toFixed(2))
           }
       }
        getBalanceUser();
    }, [user]);

    const renderLinks = () => {
        let routes =
            !user
                ? publicRoutes
                : user.role === "FREELANCER"
                    ? freelancerRoutes
                    : user.role === "CUSTOMER"
                        ? customerRoutes
                        : adminRoutes;

        return routes
            .filter(({isVisit}) => isVisit)
            .map(({path, name}) => {
                return <li>
                    <Link className="flex items-center text-base space-x-1 font-medium text-gray-700 hover:text-blue-600"
                          to={path} title={name}>{name}</Link>
                </li>
            })
    }

    return (
        <>
            <div className="relative bg-[#f7fdfd] z-50">
                <nav className="container mx-auto flex items-center justify-between p-5">
                    <div>
                        <Link to="/" className="text-blue-600 font-bold text-xl">
                            Job<span className="text-[#167cccb]">Finder</span>
                        </Link>
                    </div>
                    <ul className="hidden lg:flex gap-10 text-base">
                        {renderLinks()}
                    </ul>
                    <ul className="hidden lg:flex gap:10 text-base"></ul>
                    <div className="lg:bolck">
                        {(!user || !token) ? (
                            <Link to="/user-auth">
                                <CustomButton
                                    title="Авторизоваться"
                                    containerStyles="text-blue-600 py-1.5 px-5 focus:outline-none
                                    hover:bg-blue-700 hover:text-white rounded-full text-base
                                     border border-blue-600"
                                    onClick={() => setIsOpen(true)}
                                />
                            </Link>
                        ) : (
                            <div>
                                <MenuList
                                    user={user}
                                    onLogout={onLogout}
                                    balance={balance}
                                />
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;