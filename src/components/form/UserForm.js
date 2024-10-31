import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment} from "react";
import {CustomButton, TextInput} from "../index";


const UserForm = ({ open, setOpen, userInfo, onUserDataSubmit }) => {
    const { user } = useSelector((state) => state.user);
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: { ...userInfo },
    });


    const closeModal = () => setOpen(false);

    return (
        <>
            <Transition appear show={open ?? false} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold leading-6 text-gray-900"
                                    >
                                        Редактирование профиля
                                    </Dialog.Title>
                                    <form
                                        className="w-full mt-2 flex flex-col gap-5"
                                        onSubmit={handleSubmit(onUserDataSubmit)}
                                    >
                                        <div className="w-full flex gap-2">
                                            <div className="w-1/2">
                                                <TextInput
                                                    name="firstName"
                                                    label="Имя"
                                                    placeholder="Например: Иван"
                                                    type="text"
                                                    register={register("firstName", {
                                                        required: "Имя не указано!",
                                                    })}
                                                    error={
                                                        errors.firstName ? errors.firstName?.message : ""
                                                    }
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <TextInput
                                                    name="lastName"
                                                    label="Last Name"
                                                    placeholder="Например: Иванов"
                                                    type="text"
                                                    register={register("lastName", {
                                                        required: "Фамилия не указана",
                                                    })}
                                                    error={
                                                        errors.lastName ? errors.lastName?.message : ""
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <TextInput
                                            name="email"
                                            label="Email"
                                            placeholder="example@example.com"
                                            type="email"
                                            register={register("email", {
                                                required: "Email не указан!",
                                            })}
                                            error={errors.email ? errors.email?.message : ""}
                                        />

                                        <TextInput
                                            name="profilePicture"
                                            label="Картинка профиля"
                                            placeholder="Например: http://example.png"
                                            type="text"
                                            register={register("profilePicture", {
                                                required: "Картинка профиля обязательный параметр",
                                            })}
                                            error={
                                                errors.profilePicture
                                                    ? errors.profilePicture?.message
                                                    : ""
                                            }
                                        />

                                        <div className="flex flex-col">
                                            {errors.about && (
                                                <span
                                                    role="alert"
                                                    className="text-xs text-red-500 mt-0.5"
                                                >
                          {errors.about?.message}
                        </span>
                                            )}
                                        </div>

                                        <div className="mt-4">
                                            <CustomButton
                                                type="submit"
                                                containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                                                title={"Submit"}
                                            />
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default UserForm;