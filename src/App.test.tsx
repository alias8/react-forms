import React from "react";
import { render } from "@testing-library/react";
import { Form } from "./Form";

/*
 * Note: I am unfamiliar with this library so I just did basic checks. There is probably a better way to test for
 * existence of input labels with "TFN" and "address" etc.
 * */
test("check that custom props provided appear in the DOM", () => {
  const { getByText } = render(
    <Form formSchema={{ TFN: true, Address: true }} />
  );
  expect(getByText("TFN")).toBeInTheDocument();
  expect(getByText("Address")).toBeInTheDocument();
});

test("check that if custom props not provided, they do not appear in the DOM", () => {
  const { queryByText } = render(<Form />);
  expect(queryByText("TFN")).toBeNull();
  expect(queryByText("Address")).toBeNull();
});
