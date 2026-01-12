import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
      <p className="mt-4 text-lg">
        {error?.statusText || error?.message || "Something went wrong"}
      </p>
      <Link to="/" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">
        Go To Home
      </Link>
    </div>
  );
};

export default ErrorPage;
