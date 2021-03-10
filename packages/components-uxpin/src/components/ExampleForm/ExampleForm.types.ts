import { Components } from 'components';
import { Omit } from '../../utils/interface';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleFormProps extends Omit<Components.ExampleForm, "submit"|"reset"> {
  header?: React.ReactNode;
  children?: React.ReactNode;
}