import { render, screen } from "@testing-library/react";
import App from "../components/App";
import React from "react";
import ReactDOM from "react-dom";

test("<App />", () => {
  const { container, getByText } = render(<App />);
  screen.logTestingPlaygroundURL();
});
