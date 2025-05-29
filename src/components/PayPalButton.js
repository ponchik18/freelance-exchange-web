import React, {useState} from 'react';
import keycloak from "../helpers/keycloak";
import {createPayment} from "../axios/PaymentService";
import {useSelector} from "react-redux";

const PayPalButton = ({data}) => {
    const [redirectUrl, setRedirectUrl] = useState();
    const {token} = useSelector((state) => state.user);

    const handlePayment = async () => {
        try {
            const response = await createPayment(data, token)
            window.open(response.data.url, '_blank');
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">Оплатить заказ</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handlePayment}
            >
                Оплатить заказ PayPal
            </button>
        </>
    );
};

export default PayPalButton;