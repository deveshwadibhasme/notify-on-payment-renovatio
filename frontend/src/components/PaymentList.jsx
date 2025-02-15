import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentList = ({handleDisplay}) => {
    const [payments, setPayments] = useState([]);
    const BackendURI = import.meta.env.VITE_API_BackendURI
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
        <div className="container mx-auto mt-20 p-4 max-w-5xl border-1">
            <h1 className="text-2xl font-bold mb-4 text-center">Payment List</h1>
            <hr />
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
                    {(payments.length !== 0) ? payments[0].data.map((payment, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b text-center">{payment.name}</td>
                            <td className="py-2 px-4 border-b text-center">{payment.mobile}</td>
                            <td className="py-2 px-4 border-b text-center">{payment.amount}</td>
                            <td className="py-2 px-4 border-b text-center">{payment.email}</td>
                        </tr>
                    )):<tr className='text-center'><td>Noting To See Here</td></tr>}
                </tbody>
            </table>
            <div 
        onClick={handleDisplay}
        className="mx-auto bg-green-400 w-28 font-bold text-center mt-3 rounded-full p-1 cursor-pointer">Display Form</div>
        </div>
    );
};

export default PaymentList;