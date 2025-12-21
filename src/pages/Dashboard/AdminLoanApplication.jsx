import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminLoanApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [filterStatus, setFilterStatus] = useState("");

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications", filterStatus],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      if (filterStatus) {
        return res.data.filter((app) => app.status === filterStatus);
      }
      return res.data;
    },
  });

  const handleViewApplication = (app) => {
    Swal.fire({
      title: "Application Details",
      html: `
        <p><strong>User:</strong> ${app.borrowerName} (${app.borrowerEmail})</p>
        <p><strong>Loan Id:</strong> ${app.loanId}</p>
        <p><strong>Income Source:</strong> ${app.incomeSource}</p>
        <p><strong>Monthly Income:</strong> ${app.monthlyIncome}</p>
        <p><strong>Application Fee Status:</strong> ${app.applicationFeeStatus}</p>
        <p><strong>Loan Category:</strong> ${app.loanTitle}</p>
        <p><strong>Amount:</strong> ${app.loanAmount}</p>
        <p><strong>Status:</strong> ${app.status}</p>
        <p><strong>Date:</strong> ${app.createdAt}</p>
        <p><strong>Tracking Id:</strong> ${app.trackingId}</p>
      `,
    });
  };
  return (
    <div>
      <h2 className="text-4xl">Loan Applications: {applications.length}</h2>

      <div className="my-4">
        <label>Filter by Status: </label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>User</th>
              <th>Loan Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app._id}</td>
                <td>
                  {app.borrowerName} ({app.borrowerEmail})
                </td>
                <td>{app.loanTitle}</td>
                <td>{app.loanAmount}</td>
                <td>{app.status}</td>
                <td>
                  <button
                    className="btn btn-sm bg-blue-400"
                    onClick={() => handleViewApplication(app)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLoanApplication;
