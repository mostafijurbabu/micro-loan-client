import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Oops! Something went wrong।</h1>
      <p>{error?.message || "Unknown Error"}</p>
      <a href="/">Go To Home</a>
    </div>
  );
};

export default ErrorPage;
