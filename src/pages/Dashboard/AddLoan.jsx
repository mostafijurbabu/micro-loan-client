import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddLoan = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    data.createdAt = new Date();
    data.showOnHome = !!data.showOnHome;

    await axiosSecure.post("/loans", data);

    Swal.fire("Success!", "Loan added successfully", "success");
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Add New Loan</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Loan Title */}
        <div>
          <label className="block mb-1 font-medium">Loan Title</label>
          <input
            {...register("title")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Loan Title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Description"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            {...register("category")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Category"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block mb-1 font-medium">Interest Rate (%)</label>
          <input
            type="number"
            {...register("interestRate")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Max Loan Limit */}
        <div>
          <label className="block mb-1 font-medium">Max Loan Limit</label>
          <input
            type="number"
            {...register("maxLoanLimit")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Required Documents */}
        <div>
          <label className="block mb-1 font-medium">Required Documents</label>
          <input
            {...register("requiredDocuments")}
            className="w-full border px-3 py-2 rounded"
            placeholder="NID, Bank Statement"
          />
        </div>

        {/* EMI Plans */}
        <div>
          <label className="block mb-1 font-medium">EMI Plans</label>
          <input
            {...register("emiPlans")}
            className="w-full border px-3 py-2 rounded"
            placeholder="6, 12, 24 months"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            {...register("image")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Image URL"
          />
        </div>

        {/* Show on Home */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("showOnHome")} />
          <label>Show on Home</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full text-black py-2 rounded hover:btn-secondary hover:text-white"
        >
          Add Loan
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
