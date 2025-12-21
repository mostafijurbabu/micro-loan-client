import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminAllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch all loans
  const { data: loans = [], refetch } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  // Delete Loan
  const handleDeleteLoan = (loanId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This loan will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/loans/${loanId}`).then(() => {
          Swal.fire("Deleted!", "Loan has been deleted.", "success");
          refetch();
        });
      }
    });
  };

  // Toggle showOnHome
  const handleShowOnHomeToggle = (loan) => {
    axiosSecure
      .patch(`/loans/${loan._id}`, { showOnHome: !loan.showOnHome })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `Loan ${loan.loanTitle || loan.title} ${
            !loan.showOnHome ? "shown" : "hidden"
          } on Home`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      });
  };

  // Open Modal with prefill
  const openModal = (loan) => {
    setSelectedLoan(loan);
    setFormData({
      title: loan.title || loan.loanTitle,
      description: loan.description || "",
      interest: loan.interest || "",
      category: loan.category || loan.loanCategory,
      image: loan.image || loan.loanImage,
      maxLoanLimit: loan.maxLoanLimit || "",
      emiPlans: loan.emiPlans || "",
    });
    setIsModalOpen(true);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit update
  const handleUpdate = (e) => {
    e.preventDefault();
    axiosSecure.patch(`/loans/${selectedLoan._id}`, formData).then(() => {
      Swal.fire("Updated!", "Loan info has been updated.", "success");
      refetch();
      setIsModalOpen(false);
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">All Loans (Admin)</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>
                  <img
                    src={loan.loanImage || loan.image}
                    alt={loan.loanTitle || loan.title}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td>{loan.loanTitle || loan.title}</td>
                <td>{loan.interest}%</td>
                <td>{loan.loanCategory || loan.category}</td>
                <td>{loan.createdBy || "Admin"}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={loan.showOnHome || false}
                    onChange={() => handleShowOnHomeToggle(loan)}
                  />
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm bg-red-500 hover:bg-red-600"
                    onClick={() => handleDeleteLoan(loan._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600"
                    onClick={() => openModal(loan)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4">Update Loan</h3>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
              <input
                type="number"
                name="interest"
                placeholder="Interest"
                value={formData.interest}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="maxLoanLimit"
                placeholder="Max Loan Limit"
                value={formData.maxLoanLimit}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="emiPlans"
                placeholder="EMI Plans"
                value={formData.emiPlans}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  className="btn btn-sm bg-gray-400 hover:bg-gray-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm bg-blue-500 hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllLoans;
