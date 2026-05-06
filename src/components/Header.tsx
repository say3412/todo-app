import React from "react";
import "./Header.css";

function Header() {
  console.log('Header update');
  return (
    <div className="header">
      <h3>오늘은 🗓️</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
}

export default React.memo(Header);
