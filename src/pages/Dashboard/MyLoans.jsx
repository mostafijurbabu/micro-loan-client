import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { CiViewTable } from "react-icons/ci";
import { FcCancel } from "react-icons/fc";
import { MdPayments } from "react-icons/md";
import { Link } from "react-router";

const MyLoans = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user.email}`);
      return res.data;
    },
  });

  const handleLoanDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/application/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Canceled!",
              text: "Your application has been canceled.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (application) => {
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

  return (
    <div>
      <h2 className="text-2xl">My Loan: {applications.length} </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Applicant Name</th>
              <th>Loan Info</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application._id}>
                <th>{index + 1}</th>
                <td>{application.firstName}</td>
                <td>{application.loanTitle}</td>
                <td>{application.loanAmount}</td>
                <td>{application.status}</td>
                <td>
                  <button className="btn btn-square hover:bg-primary">
                    <CiViewTable />
                  </button>
                  <button
                    onClick={() => handleLoanDelete(application._id)}
                    className="btn btn-square hover:bg-primary mx-2"
                  >
                    <FcCancel />
                  </button>
                  {application.applicationFeeStatus === "unpaid" ? (
                    <button
                      onClick={() => handlePayment(application)}
                      className="btn btn-square btn-warning hover:bg-primary"
                    >
                      Pay
                    </button>
                  ) : (
                    <span className="badge badge-success text-black">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLoans;
