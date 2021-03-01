export enum GlobalCssClass {
  FormElement = 'example-form-element',
  FormElementInvalid = 'example-form-element--invalid',
  SROnly = 'example-sr-only',
  NoScroll = 'example-no-scroll',
  Hidden = 'example-hidden',
  IgnoreStack = 'example-stack--ignore',
}

export type OnOff = 'off' | 'on';

export type InputError = boolean | string;

export interface InputEventStatus {
  value: string | number;
  element: HTMLInputElement | HTMLTextAreaElement | undefined;
  name: string;
  type: TextFieldType;
  required: boolean;
  error: boolean | string;
  label?: string;
}

export enum TextFieldType {
  Date = 'date',
  Email = 'email',
  Number = 'number',
  Password = 'password',
  Search = 'search',
  Tel = 'tel',
  Text = 'text',
  Url = 'url',
  Time = 'time',
  Color = 'color',
}

export enum SelectWidth {
  Two = '2',
  Four = '4',
  Six = '6',
  Eight = '8',
  Ten = '10',
  Twelve = '12',
  Sixteen = '16',
  TwentyFivePercent = '25Perc',
  FiftyPercent = '50Perc',
  SeventyFivePercent = '75Perc',
}


/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type FormData = Record<string, any>;

export interface ValidationMessage {
  status?: string;
  targetId: string;
  message: string;
  linkToTarget?: boolean;
}

export enum HeadingLevel {
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

export enum FieldErrorType {
  PatternMismatch = 'patternMismatch',
  RangeOverflow = 'rangeOverflow',
  RangeUnderflow = 'rangeUnderflow',
  TooLong = 'tooLong',
  TooShort = 'tooShort',
  TypeMismatch = 'typeMismatch',
  StepMismatch = 'stepMismatch',
  ValueMissing = 'valueMissing',
}

export interface ErrorMessageTemplates {
  [FieldErrorType.StepMismatch]: string;
  [FieldErrorType.PatternMismatch]: string;
  [FieldErrorType.RangeOverflow]: string;
  [FieldErrorType.RangeUnderflow]: string;
  [FieldErrorType.TooLong]: string;
  [FieldErrorType.TooShort]: string;
  [FieldErrorType.TypeMismatch]: string;
  [FieldErrorType.ValueMissing]: string;
}

export interface FormFieldStatus {
  value: string | number | string[];
  element: HTMLElement;
  name: string;
  type: FormElementType;
  required: boolean;
  error: boolean | string;
}

export enum FormElementType {
  Date = 'date',
  Email = 'email',
  Number = 'number',
  Password = 'password',
  Search = 'search',
  Tel = 'tel',
  Text = 'text',
  Url = 'url',
  Time = 'time',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Select = 'select',
  CheckboxGroup = 'checkbox-group',
  RadioGroup = 'radio-group',
}

export type StandardFormElement = HTMLInputElement | HTMLSelectElement;

export type NameValue = {
  name: string;
  value: string;
};

export type LabelValue = {
  label: string;
  value: string;
  testId?: string;
};

export type NameValueArray = NameValue[];
