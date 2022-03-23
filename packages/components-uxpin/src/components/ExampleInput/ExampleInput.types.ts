import { Components } from 'components';
import { Omit } from '../../utils/interface';
import { MutableRefObject } from 'react';

export type InputRef = MutableRefObject<HTMLExampleInputElement | undefined>;

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleInputProps extends Omit<Components.ExampleInput, "getNativeElement"|"validate"|"reset"> {
  uxpinRef?: InputRef;
  children?: React.ReactNode;
  onChange?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onInput?: () => void;
  onKeyDown?: () => void;
  onClear?: () => void;
  slot?: string;
}