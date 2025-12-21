import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import Swal from "sweetalert2";
import { CiViewTable } from "react-icons/ci";
import { FcCancel } from "react-icons/fc";
import { MdPayment } from "react-icons/md";

const MyLoans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: applications = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
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
        axiosSecure.delete(`/applications/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount > 0) {
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
      cost: 10,
      applicationId: application._id,
      userEmail: application.borrowerEmail,
      applicantName: application.firstName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Something went wrong</p>;
  }

  const handleViewPayment = async (applicationId) => {
    try {
      const res = await axiosSecure.get(
        `/payments/by-application/${applicationId}`
      );
      setPaymentDetails(res.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", "Payment information not found", "error");
    }
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
                    <button
                      onClick={() => handleViewPayment(application._id)}
                      className="badge badge-success text-black cursor-pointer"
                    >
                      Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && paymentDetails && (
          <dialog open className="modal">
            <div className="modal-box">
              <h3 className="flex items-center gap-2 font-bold text-lg mb-4">
                {" "}
                <MdPayment /> Payment Details
              </h3>

              <p>
                <strong>Email:</strong> {paymentDetails.customerEmail}
              </p>
              <p>
                <strong>Transaction ID:</strong> {paymentDetails.transactionId}
              </p>
              <p>
                <strong>Tracking ID:</strong> {paymentDetails.trackingId}
              </p>
              <p>
                <strong>Application ID:</strong> {paymentDetails.applicationId}
              </p>
              <p>
                <strong>Amount:</strong> ${paymentDetails.amount}
              </p>
              <p>
                <strong>Status:</strong> {paymentDetails.paymentStatus}
              </p>
              <p>
                <strong>Paid At:</strong>{" "}
                {new Date(paymentDetails.paidAt).toLocaleString()}
              </p>

              <div className="modal-action">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default MyLoans;
