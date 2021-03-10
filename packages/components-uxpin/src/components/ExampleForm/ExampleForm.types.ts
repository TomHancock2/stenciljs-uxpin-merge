import { Components } from 'components';
import React from 'react';
import { Omit } from '../../utils/interface';

// Import types from Stencil, Omitting methods and adding UXPin specific types
export interface ExampleFormProps extends Omit<Components.ExampleForm, "submit"|"reset"> {
  uxpId?: string;
  uxpinRef?: string;
  children?: React.ReactNode;
}