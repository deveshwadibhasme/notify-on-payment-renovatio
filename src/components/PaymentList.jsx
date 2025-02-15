import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);

    const BackendURI = `process.env.BackendURI`
    useEffect( () => {
      axios.get(`${BackendURI}/payments-data`)
            .then(response => {
                setPayments(preState => [...preState,response.data]);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Payment List</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Mobile Number</th>
                        <th className="py-2 px-4 border-b">Donation Amount</th>
                        <th className="py-2 px-4 border-b">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length !== 0 ? payments.map((payment, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{payment.name}</td>
                            <td className="py-2 px-4 border-b">{payment.mobile}</td>
                            <td className="py-2 px-4 border-b">{payment.amount}</td>
                            <td className="py-2 px-4 border-b">{payment.email}</td>
                        </tr>
                    )):''}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentList;