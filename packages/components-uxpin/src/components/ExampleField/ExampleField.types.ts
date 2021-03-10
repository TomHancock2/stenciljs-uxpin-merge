import { Components } from 'components';
import { Omit } from '../../utils/interface';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleFieldProps extends Omit<Components.ExampleField, "validateField"|"resetField"|"registerInputElement"|"unregisterInputElement"> {
  children?: React.ReactNode;
}