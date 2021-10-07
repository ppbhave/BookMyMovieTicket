import React from "react";
import ReactDOM from "react-dom";
 import { useHistory, useParams } from "react-router";
import "./styles/payment.css"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function Payment() {
    const payable = useParams();
    const bookingReq = JSON.parse(localStorage.getItem("bookingReq"));
    const history = useHistory();
    const historyPush = (url) => {
        history.push(url);
    }
    const createOrder = (data, actions) => {

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: payable.payment,
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            const requestOptions = {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingReq)
            };
            fetch("https://localhost:8443/session/seatbooking", requestOptions)
                .then((response) =>
                    response.json())
                .then((data) => {
                    if (data.httpstatus === "OK") {
                        alert(data.message);
                        console.log(details);
                        historyPush("/Movies");
                    }
                });
            
        });
    };

    const onCancel = (data, actions) => {
        alert("payent aborted.");
        historyPush("/Movies");
    }

    return (
        <div className="payments-component page-content">
            <div className="paymeny-checkout-box">
                <PayPalButton
                    createOrder={(data, actions) => createOrder(data, actions)}
                    onApprove={(data, actions) => onApprove(data, actions)}
                    onCancel={(data, actions) => onCancel(data, actions)}
                />
            </div>
        </div>

    );
}
export default Payment;