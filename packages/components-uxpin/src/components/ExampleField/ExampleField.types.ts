import { Components } from 'components';
import { Omit } from '../../utils/interface';
import { MutableRefObject } from 'react';

export type FieldRef = MutableRefObject<HTMLExampleFieldElement | undefined>;

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleFieldProps extends Omit<Components.ExampleField, "validateField"|"resetField"|"registerInputElement"|"unregisterInputElement"> {
  uxpinRef?: FieldRef;
  children?: React.ReactNode;
  slot?: string;
}