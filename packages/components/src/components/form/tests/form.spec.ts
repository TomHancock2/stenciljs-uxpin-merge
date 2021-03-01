import { newSpecPage } from '@stencil/core/testing';

import { Form } from '../';
import { Field } from '../../field';
import { FormDefaultText } from '../form.types';

describe('Form', () => {
    let page;
    let component;
    let field;
    let input;
    let ele;
    let form;

    beforeEach(async () => {
        page = await newSpecPage({
            components: [Form, Field],
            html: `<div></div>`,
        });
        component = page.doc.createElement('example-form');
        field = page.doc.createElement('example-field');
        input = page.doc.createElement('input');
        input.name = 'inputName';

        field.appendChild(input);
        component.appendChild(field);

        page.root.appendChild(component);
        await page.waitForChanges();
        ele = page.rootInstance;
        form = page.body.querySelector('form');
        form.checkValidity = jest.fn().mockImplementation(() => {
            return true;
        });
    });

    it('builds', () => {
        expect(ele).toBeTruthy();
    });

    it('renders with defaults', async () => {
        expect(ele.allowRedirect).toBe(false);
        expect(ele.autocomplete).toBe('off');
        expect(ele.disabledValidation).toBe(false);
        expect(ele.hiddenErrorSummary).toBe(false);
        expect(ele.method).toBe('get');
        expect(ele.patternMismatch).toBe(FormDefaultText.PatternMismatch);
        expect(ele.rangeOverflow).toBe(FormDefaultText.RangeOverflow);
        expect(ele.rangeUnderflow).toBe(FormDefaultText.RangeUnderflow);
        expect(ele.tooLong).toBe(FormDefaultText.TooLong);
        expect(ele.tooShort).toBe(FormDefaultText.TooShort);
        expect(ele.typeMismatch).toBe(FormDefaultText.TypeMismatch);
        expect(ele.stepMismatch).toBe(FormDefaultText.StepMismatch);
        expect(ele.valueMissing).toBe(FormDefaultText.ValueMissing);
    });

    it('renders standard form props', async () => {
        ele.acceptCharset = 'test-charset';
        ele.action = '/test-action';
        ele.autocomplete = 'on';
        ele.enctype = 'test-enc';
        ele.method = 'post';
        ele.name = 'test-form';
        ele.target = '_blank';

        await page.waitForChanges();

        expect(form.getAttribute('acceptCharset')).toBe('test-charset');
        expect(form.getAttribute('action')).toBe('/test-action');
        expect(form.getAttribute('autocomplete')).toBe('on');
        expect(form.getAttribute('enctype')).toBe('test-enc');
        expect(form.getAttribute('method')).toBe('post');
        expect(form.getAttribute('name')).toBe('test-form');
        expect(form.getAttribute('target')).toBe('_blank');
        expect(form.hasAttribute('noValidate')).toBeTruthy();
    });

    describe('validation', () => {
        it('validates', () => {
            const valid = ele.validateForm(form);
            expect(valid).toBeTruthy();
        });
        it('is not valid', () => {
            //ele.hiddenErrorSummary = true;
            form.checkValidity = jest.fn().mockImplementation(() => {
                return false;
            });
            form['elements'] = [
                {
                    id: 'inputName',
                    name: 'inputName',
                    type: 'text',
                    validity: {
                        valid: false,
                    },
                },
            ];
            const valid = ele.validateForm(form);
            expect(valid).toBe(false);
            expect(ele.errors).toHaveLength(1);
        });
    });

    describe('onSubmit', () => {
        it('prevents the form from submitting by default', async () => {
            const preventDefaultSpy = jest.fn();
            ele.allowRedirect = false;
            ele.disabledValidation = true;
            await page.waitForChanges();
            ele.onSubmit({
                preventDefault: preventDefaultSpy,
            });
            expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
        });

        it('allows the form to submit when allowRedirect is true', async () => {
            const preventDefaultSpy = jest.fn();
            ele.allowRedirect = true;
            ele.disabledValidation = true;
            await page.waitForChanges();
            ele.onSubmit({
                preventDefault: preventDefaultSpy,
            });
            expect(preventDefaultSpy).toHaveBeenCalledTimes(0);
        });

        it('does not validate the form when disabledValidation is true', async () => {
            const validateSpy = jest.fn();
            ele.disabledValidation = true;
            ele.validateForm = validateSpy;
            await page.waitForChanges();
            ele.onSubmit({
                preventDefault: () => false,
            });
            expect(validateSpy).toHaveBeenCalledTimes(0);
        });

        it('validates the form when disabledValidation is not true', async () => {
            jest.useFakeTimers();
            const validateSpy = jest.fn();
            validateSpy.mockReturnValue(true);
            ele.validateForm = validateSpy;
            ele.nativeForm = {
                reset: (): null => null,
                setAttribute: (): null => null,
                removeAttribute: (): null => null,
            };
            await page.waitForChanges();
            jest.advanceTimersByTime(20);
            ele.onSubmit({
                preventDefault: (): boolean => false,
                target: {},
            });
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });

        it('calls handleValidForm when the form is valid', async () => {
            const handleValidSpy = jest.fn();
            ele.handleValidForm = handleValidSpy;
            ele.validateForm = (): boolean => true;
            await page.waitForChanges();
            ele.onSubmit({
                preventDefault: (): boolean => false,
                target: {},
            });
            expect(handleValidSpy).toHaveBeenCalledTimes(1);
        });

        it('calls handleInvalidForm when the form is not valid', async () => {
            const handleInvalidSpy = jest.fn();
            ele.handleInvalidForm = handleInvalidSpy;
            ele.validateForm = (): boolean => false;
            await page.waitForChanges();
            ele.onSubmit({
                preventDefault: (): boolean => false,
                target: {},
            });
            expect(handleInvalidSpy).toHaveBeenCalledTimes(1);
        });

        it('emits exampleFormSubmit event when validation is disabled', async () => {
            const submitEmitSpy = jest.fn();
            ele.exampleFormSubmit.emit = submitEmitSpy;
            ele.disabledValidation = true;
            await page.waitForChanges();
            ele.onSubmit({
                preventDefault: (): boolean => false,
                target: {},
            });
            expect(submitEmitSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleValidForm', () => {
        it('it submits the native form is allowRedirect is true', async () => {
            ele.allowRedirect = true;
            const submitSpy = jest.fn();
            ele.nativeForm = {
                submit: submitSpy,
            };
            await page.waitForChanges();
            ele.handleValidForm();
            expect(submitSpy).toHaveBeenCalledTimes(1);
        });

        it('sets the form to valid, emit submit event and resets the form', async () => {
            const resetSpy = jest.fn();
            const setAttrSpy = jest.fn();
            const removeAttrSpy = jest.fn();
            const submitSpy = jest.fn();
            ele.nativeForm = {
                removeAttribute: removeAttrSpy,
                setAttribute: setAttrSpy,
            };
            ele.resetForm = resetSpy;
            ele.exampleFormSubmit.emit = submitSpy;
            await page.waitForChanges();
            ele.handleValidForm();
            expect(resetSpy).toHaveBeenCalledTimes(1);
            expect(removeAttrSpy).toHaveBeenCalledTimes(1);
            expect(removeAttrSpy).toHaveBeenCalledWith('aria-invalid');
            expect(submitSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleInvalidForm', () => {
        it('sets the form to invalid, focuses on error summary and emits invalid event', async () => {
            const setAttrSpy = jest.fn();
            const focusSpy = jest.fn();
            const invalidSpy = jest.fn();
            ele.nativeForm = {
                setAttribute: setAttrSpy,
                querySelector: (): Record<string, unknown> => ({
                    focus: focusSpy,
                }),
            };
            ele.exampleFormInvalid = {
                emit: invalidSpy,
            };
            await page.waitForChanges();
            ele.handleInvalidForm();
            expect(setAttrSpy).toHaveBeenCalledTimes(1);
            expect(setAttrSpy).toHaveBeenCalledWith('aria-invalid', 'true');
            expect(focusSpy).toHaveBeenCalledTimes(1);
            expect(invalidSpy).toHaveBeenCalledTimes(1);
        });

        it('focusses on the first erroring element when error summary is hidden', async () => {
            const focusSpy = jest.fn();
            ele.hiddenErrorSummary = true;
            ele.errors = [{ name: 'test', value: 'test' }];
            ele.nativeForm = {
                setAttribute: (): null => null,
                querySelector: (): Record<string, unknown> => ({
                    focus: focusSpy,
                }),
            };
            await page.waitForChanges();
            ele.handleInvalidForm();
            setTimeout(() => expect(focusSpy).toHaveBeenCalledTimes(1), 25);
        });
    });
});
