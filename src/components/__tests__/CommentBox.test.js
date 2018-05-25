import React from "react";
import { mount } from "enzyme";
import Root from "Root";

import CommentBox from "components/CommentBox";

let component;

beforeEach(() => {
  component = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

it("has a textarea and a button", () => {
  expect(component.find("textarea").length).toEqual(1);
  expect(component.find("button").length).toEqual(1);
});

describe("the textarea", () => {
  beforeEach(() => {
    // second argument of simulate() acts as event.target.value text typed in textarea
    component.find("textarea").simulate("change", {
      target: { value: "new comment" }
    });
    // force CommentBox to update/rerender with new state
    component.update();
  });

  it("has a textarea that users can type in", () => {
    //expect
    expect(component.find("textarea").prop("value")).toEqual("new comment");
  });

  it("when form is submitted, textarea gets emptied", () => {
    expect(component.find("textarea").prop("value")).toEqual("new comment");
    component.find("form").simulate("submit");
    component.update();
    expect(component.find("textarea").prop("value")).toEqual("");
  });
});

afterEach(() => {
  component.unmount();
});
