import { Components } from 'components';
import { Omit } from '../../utils/interface';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleInputProps extends Omit<Components.ExampleInput, "getNativeElement"|"validate"|"reset"> {
  uxpinRef?: string;
  children?: React.ReactNode;
  onChange?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onInput?: () => void;
  onKeyDown?: () => void;
  onClear?: () => void;
}