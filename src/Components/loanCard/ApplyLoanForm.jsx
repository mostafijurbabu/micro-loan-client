import React from "react";
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const ApplyLoanForm = () => {
  const loan = useLoaderData();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    const application = {
      borrowerEmail: user.email,
      loanId: loan._id,
      loanTitle: loan.loanTitle,
      interestRate: loan.interestRate,
      status: "pending",
      applicationFeeStatus: "unpaid",
      ...formData,
      createdAt: new Date(),
    };

    await fetch("http://localhost:5000/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    });

    alert("Loan application submitted!");
  };
  return (
    <div className="max-w-2xl mx-auto p-6 card bg-base-100">
      <h2 className="text-2xl font-bold mb-4">Apply for {loan.loanTitle}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          value={user.email}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          value={loan.loanTitle}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          value={loan.interestRate}
          readOnly
          className="input input-bordered w-full"
        />

        <input
          {...register("firstName")}
          placeholder="First Name"
          className="input input-bordered w-full"
        />
        <input
          {...register("lastName")}
          placeholder="Last Name"
          className="input input-bordered w-full"
        />
        <input
          {...register("contactNumber")}
          placeholder="Contact Number"
          className="input input-bordered w-full"
        />
        <input
          {...register("nidOrPassport")}
          placeholder="NID / Passport"
          className="input input-bordered w-full"
        />
        <input
          {...register("incomeSource")}
          placeholder="Income Source"
          className="input input-bordered w-full"
        />
        <input
          {...register("monthlyIncome")}
          placeholder="Monthly Income"
          type="number"
          className="input input-bordered w-full"
        />
        <input
          {...register("loanAmount")}
          placeholder="Loan Amount"
          type="number"
          className="input input-bordered w-full"
        />
        <textarea
          {...register("reason")}
          placeholder="Reason for Loan"
          className="textarea textarea-bordered w-full"
        />
        <textarea
          {...register("address")}
          placeholder="Address"
          className="textarea textarea-bordered w-full"
        />
        <textarea
          {...register("extraNotes")}
          placeholder="Extra Notes"
          className="textarea textarea-bordered w-full"
        />

        <button className="btn btn-primary w-full text-black" type="submit">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyLoanForm;
