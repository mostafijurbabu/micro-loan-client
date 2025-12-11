import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LoanDetails = () => {
  const loan = useLoaderData();
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const handleApply = () => {
    if (!user) return navigate("/login");
    navigate(`/apply-loan/${loan._id}`);
  };

  if (!loan) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={loan.loanImage}
        alt={loan.loanTitle || "Loan Image"}
        className="rounded-xl mb-4"
      />
      <h2 className="text-3xl font-bold">{loan.loanTitle}</h2>
      <p>{loan.description}</p>
      <p>
        <b>Category:</b> {loan.loanCategory}
      </p>
      <p>
        <b>Interest Rate:</b> {loan.interestRate}%
      </p>
      <p>
        <b>Max Limit:</b> {loan.maxLoanLimit}
      </p>
      <p>
        <b>Available EMI Plans:</b> {loan.emiPlans?.join(", ")}
      </p>

      <button
        className="btn btn-primary mt-5 text-black rounded-lg"
        onClick={handleApply}
        // disabled={!user || role === "admin" || role === "manager"}
      >
        Apply Now
      </button>
    </div>
  );
};

export default LoanDetails;
