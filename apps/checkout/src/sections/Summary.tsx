import React from "react";

interface SummaryProps {}

const Summary: React.FC<SummaryProps> = ({}) => {
  return (
    <div className="summary" style={{ border: "1px solid blue" }}>
      Summary here
    </div>
  );
};

export default Summary;
