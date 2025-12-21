import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PendingLoans = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [], refetch } = useQuery({
    queryKey: ["pending-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/pending");
      return res.data;
    },
  });

  const updateStatus = async (id, status) => {
    await axiosSecure.patch(`/applications/status/${id}`, { status });
    refetch();
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-200 shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Loan ID</th>
            <th className="px-4 py-2 text-left text-gray-600">User</th>
            <th className="px-4 py-2 text-left text-gray-600">Amount</th>
            <th className="px-4 py-2 text-left text-gray-600">Date</th>
            <th className="px-4 py-2 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((app) => (
            <tr
              key={app._id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-2">{app.loanId}</td>
              <td className="px-4 py-2">
                <div className="font-medium">{app.firstName}</div>
                <div className="text-sm text-gray-500">
                  {app.borrower?.email}
                </div>
              </td>
              <td className="px-4 py-2 font-semibold">{app.loanAmount}</td>
              <td className="px-4 py-2">
                {new Date(app.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => updateStatus(app._id, "approved")}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(app._id, "rejected")}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No pending loans found.
        </p>
      )}
    </div>
  );
};

export default PendingLoans;
