import React from "react";
import { render, screen } from "@testing-library/react";
import { Warning } from "../../components/Warning";

describe("Warning Message", () => {
  it("closed when no text", () => {
    const fakeWarningText = "";
    render(<Warning warningMsg={fakeWarningText} />);
    const child = screen.queryByTestId("warning-alert");
    expect(child).not.toBeInTheDocument();
  });
  it("opens when text present", () => {
    const fakeWarningText = "This is a test";
    const { getByTestId } = render(<Warning warningMsg={fakeWarningText} />);
    const warningText = getByTestId("warning-alert").textContent;
    expect(warningText).toEqual("This is a test");
  });
});
