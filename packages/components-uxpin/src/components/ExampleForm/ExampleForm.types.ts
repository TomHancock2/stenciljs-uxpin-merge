import { Components } from 'components';
import { Omit } from '../../utils/interface';
import { MutableRefObject } from 'react';

export type FormRef = MutableRefObject<HTMLExampleFormElement | undefined>;

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleFormProps extends Omit<Components.ExampleForm, "submit"|"reset"> {
  uxpinRef?: FormRef;
  children?: React.ReactNode;
  onSubmit?: () => void;
  onError?: () => void;
  slot?: string;
}