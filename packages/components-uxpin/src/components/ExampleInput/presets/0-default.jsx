import * as React from "react";
import ExampleInput from "../ExampleInput";

export default (
  <ExampleInput onInput={() => console.log('wrapped event')} uxpId="ExampleInput" placeholder="Example Design System"></ExampleInput>
);
