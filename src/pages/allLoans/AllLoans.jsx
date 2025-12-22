import React from "react";
import { useLoaderData } from "react-router-dom";
import LoanCard from "../../Components/loanCard/LoanCard";

const AllLoans = () => {
  const data = useLoaderData();
  const loans = Array.isArray(data) ? data : [];
  // console.log(data);
  return (
    <div>
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6">All Loans</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {loans.map((loan) => (
          <LoanCard key={loan._id} loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default AllLoans;
