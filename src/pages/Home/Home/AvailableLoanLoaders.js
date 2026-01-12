import { BASE_URL } from "../../../api/baseUrl";

export const availableLoansLoader = async () => {
  const res = await fetch(`${BASE_URL}/loans`);
  if (!res.ok)
    throw new Response("Loans not available", { status: res.status });
  return res.json();
};
