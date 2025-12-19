import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { applicationId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: application } = useQuery({
    queryKey: ["applicatins", applicationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${applicationId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: "$10",
      applicationId: application._id,
      userEmail: application.borrowerEmail,
      applicantName: application.firstName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <h1>Please Pay $10 for: {application.loanId}</h1>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
