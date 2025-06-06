import {useForm} from "react-hook-form";
import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment} from "react";
import {CustomButton, TextInput} from "../index";


const PayoutForm = ({open, setOpen, balance, onPayoutCreate}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onChange",
    });


    const closeModal = () => setOpen(false);

    return (
        <>
            <Transition appear show={open} as={Fragment}>
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
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
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
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold leading-6 text-gray-900"
                                    >
                                        Откликнуться на заказ
                                    </Dialog.Title>
                                    <form
                                        className="w-full mt-2 flex flex-col gap-5"
                                        onSubmit={handleSubmit(onPayoutCreate)}
                                    >
                                        <TextInput
                                            name="amount"
                                            label="Сумма снятия"
                                            type="number"
                                            register={register("amount", {
                                                required: "Сумма снятия не указана!",
                                                min: {
                                                    value: 0,
                                                    message: "Сумма снятия не может быть меньше или равна 0!",
                                                },
                                                max: {
                                                    value: balance,
                                                    message: `Сумма снятия не может быть больше ${balance}!`,
                                                },
                                            })}
                                            error={
                                                errors.amount ? errors.amount?.message : ""
                                            }
                                        />

                                        <TextInput
                                            name="receiver"
                                            label="Email от PayPal аккаунта"
                                            type="text"
                                            register={register("receiver", {
                                                required: "Email не указан!",
                                            })}
                                            error={
                                                errors.receiver ? errors.receiver?.message : ""
                                            }
                                        />

                                        <div className="mt-4">
                                            <CustomButton
                                                type="submit"
                                                containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                                                title={"Отправить"}
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

export default PayoutForm;