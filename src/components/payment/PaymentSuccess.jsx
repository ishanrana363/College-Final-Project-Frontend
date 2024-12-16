import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../util/baseUrl';

const PaymentSuccess = () => {
    const [order, setOrder] = useState(null);
    useEffect(() => {
        (async () => {
            const query = new URLSearchParams(window.location.search);
            const orderId = query.get("session_id");
            if (orderId) {
                let res = await axios.post(`${baseUrl()}/confirm-payment`, {
                    session_id: orderId,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(res);
            }
        })()
    }, []);
    return (
        <div>
            payment success
        </div>
    )
}

export default PaymentSuccess
