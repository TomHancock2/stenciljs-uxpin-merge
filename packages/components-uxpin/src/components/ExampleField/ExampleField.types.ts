import { Components } from 'components';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleFieldProps extends Omit<Components.ExampleField, "validateField"|"resetField"|"registerInputElement"|"unregisterInputElement"> {
  uxpId?: string;
  uxpinRef?: string;
  children?: any;
}