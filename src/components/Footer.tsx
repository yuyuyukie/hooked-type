import React from "react";

export const Footer: React.FC = () => {
  const h = document.querySelector("#app-root")?.scrollHeight;
  const height = h ? h : 0;
  return (
    <footer className="Footer">
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          listStyleType: "none",
          alignItems: "center",
          width: "100%",
        }}
      >
        <li>2021 YukiYama</li>
        <li style={{ marginLeft: "0.5rem" }}>
          <a href="https://github.com/yuyuyukie/hooked-type">
            <i className="fab fa-github fa-2x"></i>
          </a>
        </li>
        <li>
          <button
            type="button"
            id="back-to-top"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            Back to Top
          </button>
        </li>
      </ul>
    </footer>
  );
};
