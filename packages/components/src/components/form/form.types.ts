export enum FormCssClass {
    Base = 'example-form',
    Header = 'example-form__header',
    Footer = 'example-form__footer',
    Error = 'example-form--error',
    ErrorSummary = 'example-form__error-summary',
    ErrorSummaryList = 'example-form__error-summary-list',
    Alert = 'example-form__alert',
}

export enum FormDefaultText {
    PatternMismatch = '{{fieldName}} is not in a valid format',
    RangeOverflow = '{{fieldName}} must be {{attrValue}} or lower',
    RangeUnderflow = '{{fieldName}} must be {{attrValue}} or more',
    TooLong = '{{fieldName}} is too long. Must not exceed {{attrValue}} characters',
    TooShort = '{{fieldName}} is too short. Must be at least {{attrValue}} characters long',
    TypeMismatch = '{{fieldName}} is not in a valid format',
    StepMismatch = '{{fieldName}} value is not valid',
    ValueMissing = '{{fieldName}} is a required field',
    ErrorSummaryHeading = 'There was a problem submitting this form',
}

export enum FormSlot {
    Footer = 'footer',
    Header = 'header',
    Alert = 'alert',
}

export type FormMethod = 'post' | 'get';
