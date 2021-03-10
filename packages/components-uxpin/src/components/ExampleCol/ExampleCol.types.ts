import { Column } from 'components/dist/types/components/col/col';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleColProps extends Column {
  uxpId?: string;
  uxpinRef?: string;
  children?: React.ReactNode;
}