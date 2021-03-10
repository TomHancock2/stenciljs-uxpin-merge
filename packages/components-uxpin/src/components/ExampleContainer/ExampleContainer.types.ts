import { Components } from 'components';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleContainerProps extends Components.ExampleContainer {
  children?: React.ReactNode;
}