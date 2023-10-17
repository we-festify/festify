import React from "react";

const Forbidden = ({ message }) => {
  return (
    <div>
      {message ? message : "You do not have permission to access this page."}
    </div>
  );
};

export default Forbidden;
