import React from "react";
import LoanCard from "../../../../Components/loanCard/LoanCard";
import { useLoaderData } from "react-router";

const AvailableLoans = ({ loans }) => {
  const loaderLoans = useLoaderData(); // route-level loader data
  const data = loans || loaderLoans;
  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-bold my-10">Available Loans</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {data.map((loan) => (
          <LoanCard key={loan._id} loan={loan}></LoanCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableLoans;
