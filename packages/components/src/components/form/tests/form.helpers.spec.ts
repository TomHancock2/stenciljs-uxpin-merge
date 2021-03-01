import { FieldErrorType } from '../../../utils/interfaces';
import { LabelCssClass } from '../../label';
import {
    isValidFormInputElement,
    getValidationAttribute,
    getLabelText,
    getLabelElements,
    serializeForm,
    getValidationMessage,
    getErrorSummary,
    getNormalisedFormElements,
    getErrorMessageTemplates,
} from '../form.helpers';

describe('form helper functions', () => {
    describe('isValidFormElement', () => {
        it('returns undefined when passed a non form HTML element', () => {
            const ele = document.createElement('p');
            expect(isValidFormInputElement(ele)).toBe(undefined);
        });

        it('returns false when passed a form HTML element that does not take input (button)', () => {
            const ele = document.createElement('button');
            ele.type = 'submit';
            ele.name = 'test-btn';
            expect(isValidFormInputElement(ele)).toBe(false);
        });

        it('returns true when passed a form element that takes input', () => {
            const ele = document.createElement('input');
            ele.type = 'email';
            ele.name = 'test-email';
            expect(isValidFormInputElement(ele)).toBe(true);
        });
    });

    describe('getValidationAttribute', () => {
        it('returns minlength when passed error type "tooShort"', () => {
            expect(getValidationAttribute(FieldErrorType.TooShort)).toBe(
                'minlength',
            );
        });

        it('returns maxlength when passed error type "tooLong"', () => {
            expect(getValidationAttribute(FieldErrorType.TooLong)).toBe(
                'maxlength',
            );
        });

        it('returns min when passed error type "rangeUnderflow"', () => {
            expect(getValidationAttribute(FieldErrorType.RangeUnderflow)).toBe(
                'min',
            );
        });

        it('returns max when passed error type "rangeOverflow"', () => {
            expect(getValidationAttribute(FieldErrorType.RangeOverflow)).toBe(
                'max',
            );
        });

        it('returns null when passed anything else', () => {
            expect(getValidationAttribute('InvalidAttribute')).toBe(null);
            expect(getValidationAttribute(FieldErrorType.TypeMismatch)).toBe(
                null,
            );
        });
    });

    describe('getLabelText', () => {
        it('returns field number if no label element is found', async () => {
            expect(getLabelText(null, 1)).toBe('Field #2');
        });

        it('returns the text of label if no inner div is present', async () => {
            const label = document.createElement('label');
            label.textContent = 'My label text';
            label.innerText = 'My label text';
            expect(getLabelText(label, 1)).toBe('My label text');
        });

        it('returns the text inside the example-label text div', async () => {
            const label = document.createElement('label');
            const div = document.createElement('div');
            div.className = LabelCssClass.LabelText;
            div.innerHTML = 'ExampleLabel text';
            label.appendChild(div);
            expect(getLabelText(label, 1)).toBe('ExampleLabel text');
        });
    });

    describe('getLabelElements', () => {
        let label, input;
        beforeEach(() => {
            label = document.createElement('label');
            input = document.createElement('input');
            document.appendChild(input);
            document.appendChild(label);
        });

        it('return correct label for native element', () => {
            const testid = 'test-id';
            input.id = testid;
            label.setAttribute('for', testid);
            expect(getLabelElements(input)[0]).toBe(label);
        });

        it('return label with complex ID', () => {
            const testid = 'test.id';
            input.id = testid;
            label.setAttribute('for', testid);
            expect(getLabelElements(input)[0]).toBe(label);
        });
    });

    describe('serializeForm', () => {
        it('returns array contains elements', async () => {
            const form: HTMLFormElement = {
                elements: [
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'text',
                        name: 'inputName',
                        value: 'inputValue',
                    },
                ],
            };
            const data = serializeForm(form);
            expect(data).toEqual({
                inputName: 'inputValue',
            });
        });

        it('ignores checkbox & radio types unless checked', () => {
            const form: HTMLFormElement = {
                elements: [
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'checkbox',
                        name: 'chkName1',
                        value: 'on',
                        closest: (): null => null,
                    },
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'checkbox',
                        name: 'chkName2',
                        value: 'on',
                        closest: (): null => null,
                        checked: true,
                    },
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'radio',
                        name: 'inputName',
                        value: 'off',
                        closest: (): null => null,
                    },
                ],
            };
            const data = serializeForm(form);
            expect(data).toEqual({
                chkName2: 'on',
            });
        });

        it('ignores invalid elements', () => {
            const form: HTMLFormElement = {
                elements: [
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'file',
                        name: 'inputName',
                        value: 'on',
                    },
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'text',
                        name: 'inputName',
                        value: 'off',
                        disabled: true,
                    },
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'email',
                        value: 'off',
                    },
                ],
            };
            const data = serializeForm(form);
            expect(data).toEqual({});
        });

        it('returns an empty object if passed an empty form', () => {
            const form = document.createElement('form');
            const data = serializeForm(form);
            expect(data).toEqual({});
        });
    });

    describe('getValidationMessage', () => {
        it('returns the validation message', () => {
            const msgTemplates = getErrorMessageTemplates({
                valueMissing: 'Value missing',
            });
            const ele = {
                id: 'test',
                tagName: 'INPUT',
                validity: {
                    valueMissing: true,
                },
                value: '',
                closest: (): null => null,
            };

            const msg = getValidationMessage(msgTemplates, ele, 0);
            expect(msg).toBe(msgTemplates.valueMissing);
        });

        it('returns the validation message with a replaced string', () => {
            const msgTemplates = getErrorMessageTemplates({
                valueMissing: '{{fieldName}} - Value missing',
            });
            const ele = {
                id: 'test',
                tagName: 'INPUT',
                validity: {
                    valueMissing: true,
                },
                value: '',
                closest: (): null => null,
            };
            const msg = getValidationMessage(msgTemplates, ele, 0);
            expect(msg).toBe('Field #1 - Value missing');
        });

        it('returns the validation message with a replaced attribute value', () => {
            const msgTemplates = getErrorMessageTemplates({
                tooShort:
                    '{{fieldName}} - Too Short {{attrValue}} : {{fieldValue}}',
            });
            const ele = {
                id: 'test',
                tagName: 'INPUT',
                validity: {
                    tooShort: true,
                },
                value: 'a',
                closest: (): null => null,
                getAttribute: (): string => '10',
            };
            const msg = getValidationMessage(msgTemplates, ele, 0);
            expect(msg).toBe('Field #1 - Too Short 10 : a');
        });

        it('returns an empty string is template does not exist', () => {
            const msgTemplates = getErrorMessageTemplates({});
            const ele = {
                id: 'test',
                tagName: 'INPUT',
                validity: {
                    tooShort: true,
                },
                value: 'a',
                closest: (): null => null,
                getAttribute: (): number => 10,
            };
            const msg = getValidationMessage(msgTemplates, ele, 0);
            expect(msg).toBe('');
        });
    });

    describe('getErrorSummary', () => {
        it('returns array of errors', async () => {
            const form: HTMLFormElement = {
                elements: [
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'text',
                        tagName: 'INPUT',
                        name: 'inputName',
                        value: 'inputValue',
                        validity: {
                            valid: false,
                            valueMissing: true,
                        },
                        closest: (): null => null,
                        id: 'test1',
                    },
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'text',
                        tagName: 'INPUT',
                        name: 'inputName2',
                        value: '',
                        validity: {
                            valid: false,
                            valueMissing: true,
                        },
                        closest: (): null => null,
                    },
                ],
            };
            const msgTemplates = getErrorMessageTemplates({
                valueMissing: 'Value missing - {{fieldName}}',
            });
            const errors = getErrorSummary(form, msgTemplates);
            expect(errors).toHaveLength(2);
            expect(errors).toEqual([
                {
                    targetId: 'test1',
                    message: 'Value missing - field #1',
                },
                {
                    targetId: 'inputName2',
                    message: 'Value missing - field #2',
                },
            ]);
        });

        it('ignores invalid elements', async () => {
            const form: HTMLFormElement = {
                elements: [
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'text',
                        value: 'inputValue',
                        tagName: 'INPUT',
                        validity: {
                            valid: false,
                            valueMissing: true,
                        },
                        closest: (): null => null,
                        id: 'test1',
                    },
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'file',
                        value: 'inputValue',
                        tagName: 'INPUT',
                        validity: {
                            valid: false,
                            valueMissing: true,
                        },
                        closest: (): null => null,
                        id: 'test2',
                    },
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'text',
                        value: 'inputValue',
                        tagName: 'INPUT',
                        validity: {
                            valid: false,
                            valueMissing: true,
                        },
                        closest: (): null => null,
                        id: 'test3',
                        disabled: true,
                    },
                ],
            };
            const msgTemplates = getErrorMessageTemplates({
                valueMissing: 'Value missing - {{fieldName}}',
            });
            const errors = getErrorSummary(form, msgTemplates);
            expect(errors).toHaveLength(0);
        });

        it('ignores elements that validate', async () => {
            const form: HTMLFormElement = {
                elements: [
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'text',
                        value: 'inputValue',
                        tagName: 'INPUT',
                        validity: {
                            valid: true,
                        },
                        closest: (): null => null,
                        id: 'test1',
                        name: 'test1',
                    },
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - for mocking purposes.
                        type: 'text',
                        value: 'inputValue',
                        tagName: 'INPUT',
                        validity: {
                            valid: false,
                            valueMissing: true,
                        },
                        closest: (): null => null,
                        id: 'test2',
                        name: 'test2',
                    },
                ],
            };
            const msgTemplates = getErrorMessageTemplates({
                valueMissing: 'Value missing - {{fieldName}}',
            });
            const errors = getErrorSummary(form, msgTemplates);
            expect(errors).toHaveLength(1);
        });
    });

    describe('getNormalisedFormElements', () => {
        it('adds select to the valid list', () => {
            const eleList = [
                { tagName: 'SELECT', name: 'select-disabled', disabled: true },
                { tagName: 'SELECT', name: 'select' },
            ];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(getNormalisedFormElements(eleList as any)).toEqual([
                { tagName: 'SELECT', name: 'select' },
            ]);
        });

        it('adds checkboxes to the valid list', () => {
            const closestSpy = jest.fn().mockImplementation(() => null);
            const eleList = [
                {
                    tagName: 'INPUT',
                    name: 'chkbox-disabled',
                    type: 'checkbox',
                    disabled: true,
                    closest: closestSpy,
                },
                {
                    tagName: 'INPUT',
                    name: 'chkbox',
                    type: 'checkbox',
                    closest: closestSpy,
                },
            ];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(getNormalisedFormElements(eleList as any)).toEqual([
                {
                    tagName: 'INPUT',
                    name: 'chkbox',
                    type: 'checkbox',
                    closest: closestSpy,
                },
            ]);
        });

        it('adds checkbox-groups to the valid list', () => {
            const closestSpy = jest.fn().mockImplementation(() => ({
                tagName: 'example-checkbox-group',
                name: 'my-chkbox-list',
            }));
            const eleList = [
                {
                    tagName: 'INPUT',
                    name: 'chkbox',
                    type: 'checkbox',
                    closest: closestSpy,
                },
            ];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(getNormalisedFormElements(eleList as any)).toEqual([
                {
                    tagName: 'example-checkbox-group',
                    name: 'my-chkbox-list',
                },
            ]);
        });

        it('adds radio-groups to the valid list', () => {
            const closestSpy = jest.fn().mockImplementation(() => ({
                tagName: 'example-radio-group',
                name: 'my-radio-group',
            }));
            const eleList = [
                {
                    tagName: 'INPUT',
                    name: 'rad',
                    type: 'radio',
                    closest: closestSpy,
                },
            ];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(getNormalisedFormElements(eleList as any)).toEqual([
                {
                    tagName: 'example-radio-group',
                    name: 'my-radio-group',
                },
            ]);
        });
    });
});
