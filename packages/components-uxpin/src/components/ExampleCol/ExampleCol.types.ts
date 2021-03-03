import { Components } from 'components';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleColProps extends Components.ExampleCol {
  uxpId?: string;
  uxpinRef?: string;
  children?: any;
}