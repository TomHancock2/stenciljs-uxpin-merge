import * as React from "react";
import ExampleForm from "../ExampleForm";
import ExampleField from "../../ExampleField/ExampleField";
import ExampleInput from "../../ExampleInput/ExampleInput";

export default (
  <ExampleForm uxpId="ExampleForm">
    <ExampleField uxpId="ExampleForm.ExampleField" label="New field" hint="Hint Text">
      <ExampleInput uxpId="ExampleForm.ExampleField.ExampleInput" />
    </ExampleField>
  </ExampleForm>
);
