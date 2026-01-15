import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Fetch loans created by the manager
  const {
    data: loans = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["manager-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans/manager");
      return res.data;
    },
  });

  // Search filter (safe for undefined fields)
  const filteredLoans = loans.filter((loan) => {
    const title = loan.title?.toLowerCase() || "";
    const category = loan.category?.toLowerCase() || "";
    const searchText = search.toLowerCase();
    return title.includes(searchText) || category.includes(searchText);
  });

  // Full Edit Loan Modal
  const handleEdit = (loan) => {
    Swal.fire({
      title: "Edit Loan",
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${
          loan.title || ""
        }">
        <textarea id="description" class="swal2-textarea" placeholder="Description">${
          loan.description || ""
        }</textarea>
        <input id="category" class="swal2-input" placeholder="Category" value="${
          loan.category || ""
        }">
        <input id="interestRate" class="swal2-input" placeholder="Interest Rate" value="${
          loan.interestRate || ""
        }">
        <input id="maxLoanLimit" class="swal2-input" placeholder="Max Loan Limit" value="${
          loan.maxLoanLimit || ""
        }">
        <input id="requiredDocuments" class="swal2-input" placeholder="Required Documents" value="${
          loan.requiredDocuments || ""
        }">
        <input id="emiPlans" class="swal2-input" placeholder="EMI Plans" value="${
          loan.emiPlans || ""
        }">
        <input id="image" class="swal2-input" placeholder="Image URL" value="${
          loan.image || ""
        }">
        <label style="display:flex; align-items:center; justify-content:center; gap:10px; margin-top:5px;">
          Show on Home: <input type="checkbox" id="showOnHome" ${
            loan.showOnHome ? "checked" : ""
          }>
        </label>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      width: "600px",
      preConfirm: () => {
        return {
          title: document.getElementById("title").value,
          description: document.getElementById("description").value,
          category: document.getElementById("category").value,
          interestRate: document.getElementById("interestRate").value,
          maxLoanLimit: document.getElementById("maxLoanLimit").value,
          requiredDocuments: document.getElementById("requiredDocuments").value,
          emiPlans: document.getElementById("emiPlans").value,
          image: document.getElementById("image").value,
          showOnHome: document.getElementById("showOnHome").checked,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/loans/${loan._id}`, result.value);
          refetch();
          Swal.fire("Updated!", "Loan has been updated.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to update loan.", "error");
        }
      }
    });
  };

  // Delete Loan Modal
  const handleDelete = async (loan) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This loan will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/loans/${loan._id}`);
          refetch();
          Swal.fire("Deleted!", "Loan has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete loan.", "error");
        }
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Manage Loans</h2>
      <p className="text-gray-600 mb-4">
        Displays all loans created by the manager in a table format.
      </p>

      <input
        type="text"
        placeholder="Search by title or category..."
        className="border p-2 mb-4 w-full md:w-1/3 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Interest</th>
              <th className="p-2">Category</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No loans found
                </td>
              </tr>
            ) : (
              filteredLoans.map((loan) => (
                <tr key={loan._id} className="text-center">
                  <td className="p-2">
                    {loan.image ? (
                      <img
                        src={loan.image}
                        alt={loan.title}
                        width="50"
                        className="mx-auto rounded"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="p-2">{loan.title || "No Title"}</td>
                  <td className="p-2">{loan.interestRate || "-"}</td>
                  <td className="p-2">{loan.category || "-"}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <button
                      className="btn btn-primary btn-sm text-black hover:underline"
                      onClick={() => handleEdit(loan)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-secondary btn-sm text-white hover:underline"
                      onClick={() => handleDelete(loan)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLoans;
