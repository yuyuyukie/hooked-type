import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          listStyleType: "none",
          width: "100%",
          alignItems: "center",
        }}
      >
        <li>2021 YukiYama</li>
        <li style={{ marginLeft: "0.5rem" }}>
          <a href="https://github.com/yuyuyukie/hooked-type">
            <i className="fab fa-github fa-2x"></i>
          </a>
        </li>
        <li>
          <button id="back-to-top">
            <a href=".Header">Back to Top</a>
          </button>
        </li>
      </ul>
    </footer>
  );
};
