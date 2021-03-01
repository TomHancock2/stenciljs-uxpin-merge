export type NativeFormElement =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement;

export enum FieldAttributes {
    Required = 'required',
    DataRequired = 'data-example-required',
    Name = 'name',
    DisabledValidation = 'disabled-validation',
    OptionalLabels = 'optional-labels',
}

export enum FieldCssClass {
    Base = 'example-field',
    Inline = 'example-field--inline',
    Stack = 'example-field--stack',
    Join = 'example-field--join',
    Invalid = 'example-field--invalid',
    Hint = 'example-field__hint',
    Errors = 'example-field__errors',
    InputContainer = 'example-field__input-container',
    InputInnerContainer = 'example-field__input-inner',
    Wrapper = 'example-field__wrapper',
    Legend = 'example-field__legend',
}

export enum FieldTagTypes {
    Fieldset = 'fieldset',
    Div = 'div',
    Legend = 'legend',
    Label = 'example-label',
}

export type FieldLabelProps = {
    for?: string;
    focusOn?: boolean;
    labelText: string;
    required: boolean;
    optional: boolean;
    optionalText: string;
    hiddenLabel: boolean;
};
