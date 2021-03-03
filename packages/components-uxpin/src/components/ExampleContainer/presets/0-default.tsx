import * as React from "react";
import ExampleContainer from "../ExampleContainer";
import ExampleRow from "../../ExampleRow/ExampleRow";
import ExampleCol from "../../ExampleCol/ExampleCol";
import { RowGutter } from "components/dist/types/components/row/row.types";

export default (
  <ExampleContainer uxpId="ExampleContainer">
    <ExampleRow gutter={RowGutter.Lg} uxpId="ExampleContainer.ExampleRow">
      <ExampleCol uxpId="ExampleContainer.ExampleCol.1">
          Column 1
      </ExampleCol>
      <ExampleCol uxpId="ExampleContainer.ExampleCol.2">
          Column 2
      </ExampleCol>
    </ExampleRow>
  </ExampleContainer>
);
