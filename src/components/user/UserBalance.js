import React from "react";
import PropTypes from "prop-types";

const UserBalance = ({title, balance}) => {

    const formattedBalance = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(balance);

    return (
        <div className="p-4 border rounded-md shadow-md bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
            <p className="text-2xl font-bold text-green-600">
                {formattedBalance}
            </p>
        </div>
    );
};

UserBalance.propTypes = {
    balance: PropTypes.number.isRequired,
    currencySymbol: PropTypes.string,
};

export default UserBalance;
