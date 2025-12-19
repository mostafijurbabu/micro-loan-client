import React from "react";

const PaymentCancelled = () => {
  return (
    <div>
      <h2>Payment is cancelled. Please try again.</h2>
      <Link to="/dashboard/my-loans">
        <button className="btn btn-primary text-black">Try Again</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
