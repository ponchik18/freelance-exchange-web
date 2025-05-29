import React, {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useForm} from "react-hook-form";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import {registerUser} from "../axios/KeycloakService";
import {toast, ToastContainer} from "react-toastify";
import {RotatingLines} from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import {useKeycloak} from "@react-keycloak/web";

const SignUp = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [isRegister, setIsRegister] = useState(true);
    const [accountType, setAccountType] = useState("FREELANCER");
    const [errMsg, setErrMsg] = useState("");
    const {open, setOpen} = props;
    let from = location.state?.from?.from?.pathname || "/";
    const [isLoading, setIsLoading] = useState(false);

    const {keycloak} = useKeycloak();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        watch,
        formState: {errors},
    } = useForm({
        mode: "onChange",
    });
    const closeModal = () => setOpen(false);
    const onSubmit = async (data) => {
        setIsLoading(true);
        data.role = accountType;
        const response = await registerUser(data);
        if (response.status !== 201) {
            toast.error("Ошибка, пользователь с таким логином или паролем уже сущесвует");
        } else {
            reset();
            toast.success("Пользователь успешно зарегистрирован!");
        }
        setIsLoading(false);

    };

    const onLogin = () => {
        keycloak.login();
    };
    return (
        <>
            <Transition appear show={open || false}>
                <Dialog as={"div"} className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter={"ease-out duration-300"}
                        enterFrom={"opacity-0"}
                        enterTo={"opacity-100"}
                        leave={"ease-in duration-200"}
                        leaveFrom={"opacity-100"}
                        leaveTo={"opacity-0"}
                    >
                        <div className={"fixed inset-0 bg-black bg-opacity-25"}/>
                    </Transition.Child>
                    <div className={"fixed inset-0 overflow-y-auto"}>
                        <div
                            className={
                                "flex min-h-full items-center justify-center p-4 text-center"
                            }
                        >
                            <Transition.Child
                                as={Fragment}
                                enter={"ease-out duration-300"}
                                enterFrom={"opacity-0"}
                                enterTo={"opacity-100"}
                                leave={"ease-in duration-200"}
                                leaveFrom={"opacity-100"}
                                leaveTo={"opacity-0"}
                            >
                                <Dialog.Panel
                                    className={
                                        "w-2/3 max-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                                    }
                                >
                                    <Dialog.Title
                                        as={"h3"}
                                        className={"text-xl font-semibold leading-6 text-gray-900"}
                                    >
                                        {isRegister ? "Создать аккаунт" : "Авторизация"}
                                    </Dialog.Title>
                                    <div
                                        className={"w-full flex items-center justify-center py-4"}
                                    >
                                        <button
                                            className={`flex px-4 py-2 rounded text-sm outline-none ${
                                                accountType === "FREELANCER"
                                                    ? "bg-[#1d4fd862] text-blue-900 font-semibold"
                                                    : "bg-white border borer-blue-400"
                                            }`}
                                            onClick={() => setAccountType("FREELANCER")}
                                        >
                                            Фрилансер
                                        </button>
                                        <button
                                            className={`flex px-4 py-2 rounded text-sm outline-none ${
                                                accountType !== "FREELANCER"
                                                    ? "bg-[#1d4fd862] text-blue-900 font-semibold"
                                                    : "bg-white border borer-blue-400"
                                            }`}
                                            onClick={() => setAccountType("CUSTOMER")}
                                        >
                                            Заказчик
                                        </button>
                                    </div>
                                    <form
                                        className={"w-full flex flex-col gap-5"}
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <TextInput
                                            name="email"
                                            label={"Email"}
                                            placeholder={"email@example.com"}
                                            type={"email"}
                                            register={register("email", {
                                                required: "Email не указан!",
                                            })}
                                            error={errors.email ? errors.email.message : ""}
                                        />
                                        <div className={"w-full flex gap-1 md:gap-2"}>
                                            <div className={"w-1/2"}>
                                                <TextInput
                                                    name="firstName"
                                                    label={"Имя"}
                                                    placeholder={"например: Иван"}
                                                    type={"text"}
                                                    register={register("firstName", {
                                                        required: "Имя не указано!",
                                                    })}
                                                    error={
                                                        errors.firstName ? errors.firstName.message : ""
                                                    }
                                                />
                                            </div>
                                            <div className={"w-1/2"}>
                                                <TextInput
                                                    name="lastName"
                                                    label={"Фамилия"}
                                                    placeholder={"например: Иванов"}
                                                    type={"text"}
                                                    register={register("lastName", {
                                                        required: "Фамилия не указана!",
                                                    })}
                                                    error={errors.lastName ? errors.lastName.message : ""}
                                                />
                                            </div>
                                        </div>
                                        <TextInput
                                            name="userName"
                                            label={"Логин"}
                                            placeholder={"например: ivanov67"}
                                            type={"text"}
                                            register={register("userName", {
                                                required: "Логин не указан!",
                                            })}
                                            error={errors.userName ? errors.userName.message : ""}
                                        />
                                        <TextInput
                                            name="profilePicture"
                                            label={"Картинка профиля"}
                                            placeholder={"url: http://images/image.png"}
                                            type={"text"}
                                            register={register("profilePicture", {
                                                required: "Картинка профиля не указана!",
                                            })}
                                            error={
                                                errors.profilePicture
                                                    ? errors.profilePicture.message
                                                    : ""
                                            }
                                        />
                                        <div className={"w-full flex gap-1 md:gap-2"}>
                                            <div className={"w-1/2"}>
                                                <TextInput
                                                    name="password"
                                                    label={"Пароль"}
                                                    placeholder={"********"}
                                                    type={"password"}
                                                    register={register("password", {
                                                        required: "Пароль не указан!",
                                                    })}
                                                    error={errors.password ? errors.password.message : ""}
                                                />
                                            </div>
                                            <div className={"w-1/2"}>
                                                <TextInput
                                                    name="repassword"
                                                    label={"Подтвердите пароль"}
                                                    placeholder={"********"}
                                                    type={"password"}
                                                    register={register("repassword", {
                                                        required: "Пароль не потверждён!",
                                                        validate: (value) =>
                                                            value === watch("password") ||
                                                            "Пароли не соотетсвуют друг другу",
                                                    })}
                                                    error={
                                                        errors.repassword ? errors.repassword.message : ""
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {errMsg && (
                                            <span
                                                className={"text-sm text-red-500 mt-0.5"}
                                                role={"alert"}
                                            >
                        {errMsg}
                      </span>
                                        )}
                                        <div className={"mt-2"}>
                                            <CustomButton
                                                type={"submit"}
                                                containerStyles={
                                                    "inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white outline-none hover:bg-blue-800"
                                                }
                                                title={"Зарегистрироваться"}
                                            />
                                        </div>
                                        {isLoading && (
                                            <RotatingLines
                                                strokeColor="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="96"
                                                visible={true}
                                            />
                                        )}
                                    </form>
                                    <div className={"mt-4"}>
                                        <p className={"text-sm text-gray-700"}>
                                            У вас уже есть аккаунт?
                                        </p>
                                        <span
                                            className={
                                                "text-sm text-blue-600 nl-2 hover:text-blue-700 hover:font-semibold cursor-pointer"
                                            }
                                            onClick={onLogin}
                                        >
                      Авторизоваться
                    </span>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ToastContainer/>
        </>
    );
};

export default SignUp;