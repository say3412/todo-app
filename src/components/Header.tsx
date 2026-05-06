import "./Header.css";
import React from "react";

function Header() {
  console.log("header render");
  return (
    <div className="header">
      <h3>오늘은 🗓️</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
}

export default React.memo(Header);
