import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });

          setTimeout(() => {
            navigate("/dashboard/my-loans");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="">
      <h2 className="text-4xl text-green-600 font-bold">Payment Successful</h2>
      <p>Redirecting to My Loans...</p>
      <p>Your TransactionId: {paymentInfo.transactionId}</p>
      <p>Your Application trackingId: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
