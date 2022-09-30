import React from "react";

const DraftPage = ({
  top = "this is draft page",
  bottom = "Footer",
  children,
}) => {
  return (
    <div className="container-fluid">
      <h2>{top}</h2>
      {children}
      <h3>{bottom}</h3>
    </div>
  );
};

export default DraftPage;
