import { Components } from 'components';
import { MutableRefObject } from 'react';

export type ContainerRef = MutableRefObject<HTMLExampleContainerElement | undefined>;

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleContainerProps extends Components.ExampleContainer {
  uxpinRef?: ContainerRef;
  children?: React.ReactNode;
  slot?: string;
}