export const loanDetailsLoader = async ({ params }) => {
  const res = await fetch(
    `https://yes-omega-two.vercel.app/loans/${params.id}`
  );
  if (!res.ok) {
    throw new Response("Failed to load loan", { status: res.status });
  }
  const data = await res.json();
  return data;
};

export const applyLoanLoader = async ({ params }) => {
  const res = await fetch(
    `https://yes-omega-two.vercel.app/loans/${params.id}`
  );
  if (!res.ok) {
    throw new Response("Failed to load loan for apply", { status: res.status });
  }
  const data = await res.json();
  return data;
};
