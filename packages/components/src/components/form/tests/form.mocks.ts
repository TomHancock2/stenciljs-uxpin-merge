import { ErrorMessageTemplates } from '../../../utils/interfaces';

export const mockErrorMessageTemplates: ErrorMessageTemplates = {
    valueMissing: '{{fieldName}} is missing a value',
    tooShort: '{{fieldName}} is too short. Needs to be at least {{attrValue}}',
    tooLong: '{{fieldName}} is too long. Needs to be less than {{attrValue}}',
    rangeUnderflow:
        '{{fieldName}} is too low. Should be at least {{attrValue}}',
    rangeOverflow:
        '{{fieldName}} is too high. Should be less than {{attrValue}}',
    typeMismatch: '{{fieldName}} is not valid',
    patternMismatch: '{{fieldName}} is not valid',
    stepMismatch: '{{fieldName}} is not valid',
};

const mockForm = document.createElement('form');
const input = document.createElement('input');
input.type = 'email';
input.id = 'email1';
input.required = true;
const label = document.createElement('label');
label.textContent = 'Email';
label.htmlFor = 'email1';
mockForm.appendChild(label);
mockForm.appendChild(input);

export { mockForm };
