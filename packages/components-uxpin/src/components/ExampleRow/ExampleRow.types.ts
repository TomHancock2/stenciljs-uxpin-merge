import { Components } from 'components';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleRowProps extends Components.ExampleRow {
  uxpId?: string;
  uxpinRef?: string;
  children?: any;
}