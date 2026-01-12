import { BASE_URL } from "../api/baseUrl";

export const loanDetailsLoader = async ({ params }) => {
  const res = await fetch(`${BASE_URL}/loans/${params.id}`);
  if (!res.ok) throw new Response("Loan not found", { status: 404 });
  return res.json();
};

export const applyLoanLoader = async ({ params }) => {
  const res = await fetch(`${BASE_URL}/loans/${params.id}`);
  if (!res.ok) throw new Response("Unable to apply loan", { status: 404 });
  return res.json();
};
