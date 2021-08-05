import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Toolbar } from "../../components/Toolbar";

describe("Toolbar", () => {
  it("if sidebar render button is clicked", () => {
    const openSidebar = jest.fn();
    const { getByTestId } = render(<Toolbar onOpenSidebar={openSidebar} />);
    fireEvent.click(getByTestId("open-sidebar-button"));
    expect(openSidebar).toHaveBeenCalled();
  });
  it("if step button is clicked", () => {
    let count = 0;
    function step(number) {
      count = number;
    }
    const { getByTestId } = render(<Toolbar onStepForward={() => step(1)} />);
    fireEvent.click(getByTestId("step-forward-button"));
    expect(count).toEqual(1);
  });
  it("if toolbar is given depth", () => {
    const fakeDepthText = "This is a test";
    const { getByTestId } = render(<Toolbar onIDDFS={fakeDepthText} />);
    const depthText = getByTestId("iddfs-text").textContent;
    expect(depthText).toEqual("This is a test");
  });
  it("if toolbar is given not given depth", () => {
    const fakeDepthText = "";
    const { getByTestId } = render(<Toolbar onIDDFS={fakeDepthText} />);
    const depthText = getByTestId("iddfs-text").textContent;
    expect(depthText).toEqual("");
  });
  it("if step count incremented", () => {
    let currStep = 1;
    const { getByTestId } = render(<Toolbar onGetCount={currStep} />);
    const stepText = getByTestId("step-count").textContent;
    expect(stepText).toEqual("Step: " + currStep);
  });
});
