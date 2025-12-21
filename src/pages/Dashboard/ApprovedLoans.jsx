import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApprovedLoans = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: approvedLoans = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["approved-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/approved");
      return res.data;
    },
  });

  //Loading state
  if (isLoading) {
    return <p className="text-center mt-10">Loading approved loans...</p>;
  }

  //Error state
  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        {error?.message || "Something went wrong"}
      </p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Approved Loan Applications ({approvedLoans.length})
      </h2>

      {approvedLoans.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No approved loan applications found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Loan ID</th>
                <th>Borrower</th>
                <th>Amount</th>
                <th>Approved Date</th>
              </tr>
            </thead>

            <tbody>
              {approvedLoans.map((app, index) => (
                <tr key={app._id}>
                  <td>{index + 1}</td>

                  <td className="text-xs break-all">{app.loanId}</td>

                  <td>
                    <p className="font-semibold">{app.firstName}</p>
                    <p className="text-sm text-gray-500">{app.borrowerEmail}</p>
                  </td>

                  <td className="font-medium">
                    {Number(app.loanAmount).toLocaleString()}
                  </td>

                  <td>
                    {app.approvedAt
                      ? new Date(app.approvedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedLoans;
