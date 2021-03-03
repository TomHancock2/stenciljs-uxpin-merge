import { Components } from 'components';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleFormProps extends Omit<Components.ExampleForm, "reset"|"submit"> {
  uxpId?: string;
  uxpinRef?: string;
  children?: any;
}