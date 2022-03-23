import { Column } from 'components/dist/types/components/col/col';
import { MutableRefObject } from 'react';

export type ColRef = MutableRefObject<HTMLExampleColElement | undefined>;

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleColProps extends Column {
  uxpId?: string;
  uxpinRef?: ColRef;
  children?: React.ReactNode;
  slot?: string;
}