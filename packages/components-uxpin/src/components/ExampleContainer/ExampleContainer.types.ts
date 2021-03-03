import { Components } from 'components';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleContainerProps extends Components.ExampleContainer {
  uxpId?: string;
  uxpinRef?: string;
  children?: any;
}