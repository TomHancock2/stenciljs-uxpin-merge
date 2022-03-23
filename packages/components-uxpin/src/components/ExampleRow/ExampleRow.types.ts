import { Components } from 'components';
import { MutableRefObject } from 'react';

export type RowRef = MutableRefObject<HTMLExampleRowElement | undefined>;

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleRowProps extends Components.ExampleRow {
  uxpinRef?: RowRef;
  children?: React.ReactNode;
  slot?: string;
}