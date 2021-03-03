import { Components } from 'components';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleInputProps extends Omit<Components.ExampleInput, "getNativeElement"|"validate"|"reset"> {
  uxpId?: string;
  uxpinRef?: string;
  children?: any;
}