import { Components } from 'components';
import React from 'react';
import { Omit } from '../../utils/interface';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleFieldProps extends Omit<Components.ExampleField, "validateField"|"resetField"|"registerInputElement"|"unregisterInputElement"> {
  uxpId?: string;
  uxpinRef?: string;
  children?: React.ReactNode;
}