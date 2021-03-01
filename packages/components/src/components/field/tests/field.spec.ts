import { newSpecPage } from '@stencil/core/testing';

import { Field } from '../';
import { Input } from '../../input';
import { getErrorMessageTemplates } from '../../form/form.helpers';

describe('Field', () => {
    let page;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let component: any;
    let inputEl: any;
    let ele: any;
    /* eslint-enable @typescript-eslint/no-explicit-any */

    const inputName = 'inputName';

    beforeEach(async () => {
        page = await newSpecPage({
            components: [Field, Input],
            html: `<div></div>`,
        });

        // Single element
        component = page.doc.createElement('example-field');
        component.label = 'Label';
        component.hint = 'Hint';
        component.name = 'test-field';
        inputEl = page.doc.createElement('example-input');
        inputEl.name = inputName;
        inputEl.checkValidity = jest.fn().mockImplementation(() => {
            return true;
        });
        component.appendChild(inputEl);

        page.root.appendChild(component);

        await page.waitForChanges();
        ele = page.rootInstance;
    });
    describe('basic', () => {
        it('builds', () => {
            expect(ele).toBeTruthy();
        });
        it('renders with defaults', async () => {
            // Assert

            expect(ele.label).toBe('Label');
            expect(ele.hint).toBe('Hint');
            expect(ele.required).toBe(false);
            expect(ele.error).toBe('');
        });
    });

    describe('error handling', () => {
        const currentErrors = {
            targetId: inputName,
            message: 'error',
        };

        it('display errors when invalid', async () => {
            ele.errors = [{ ...currentErrors }];
            ele.invalid = true;
            await page.waitForChanges();
            const errorContainer = page.root.querySelector(
                'example-validation-message',
            );
            expect(errorContainer).toBeTruthy();
        });

        it('add an error to the errors array', async () => {
            ele.addError({
                targetId: 'input',
                message: 'error',
            });
            expect(ele.errors).toHaveLength(1);
        });

        it('updates an error in the errors array', async () => {
            ele.errors = [{ ...currentErrors }];
            ele.updateError(0, 'new error');
            expect(ele.errors[0].message).toEqual('new error');
        });

        it('removes an error from the errors array', async () => {
            ele.errors = [{ ...currentErrors }];
            ele.removeError(0);
            expect(ele.errors).toHaveLength(0);
        });

        describe('valid element', () => {
            it('does not update errors when element valid', () => {
                ele.updateErrors(inputEl);
                expect(ele.errors).toHaveLength(0);
            });
            it('removes exsiting error if element becomes valid', async () => {
                ele.errors = [{ ...currentErrors }];
                await ele.updateErrors(inputEl);
                expect(ele.errors).toHaveLength(0);
            });
        });

        describe('invalid element', () => {
            beforeEach(async () => {
                inputEl.checkValidity = jest.fn().mockImplementation(() => {
                    return false;
                });
            });
            it('does update errors when element is invalid', async () => {
                await ele.updateErrors(inputEl);
                expect(ele.errors).toHaveLength(1);
            });

            it('update current error is one exists', () => {
                ele.errors = [{ ...currentErrors }];
                ele.updateErrors(inputEl);
                expect(ele.errors).toHaveLength(1);
            });
        });
    });

    describe('events', () => {
        it('should emit event on componentDidLoad', () => {
            const eventSpy = jest.fn();
            page.doc.addEventListener('exampleFieldDidLoad', eventSpy);
            ele.componentDidLoad();
            expect(eventSpy).toHaveBeenCalled();
        });

        it('should emit event on disconnectedCallback', () => {
            const eventSpy = jest.fn();
            page.doc.addEventListener('exampleFieldDidUnload', eventSpy);
            ele.disconnectedCallback();
            expect(eventSpy).toHaveBeenCalled();
        });
    });

    describe('listener handlers', () => {
        it('runs blurHandler successfully', async () => {
            jest.useFakeTimers();
            ele.hasFocus = jest.fn().mockResolvedValue(false);
            ele.fieldElements = [inputEl];
            ele.blurHandler();
            jest.runAllTimers();
            expect(ele.errors).toHaveLength(0);
            expect(ele.invalid).toBeFalsy();
        });
    });

    describe('validation', () => {
        const defaultValidation = 'default';
        beforeEach(async () => {
            inputEl['validity'] = {
                valueMissing: true,
            };
        });

        it('returns a default validation message', () => {
            inputEl['validationMessage'] = defaultValidation;
            const msg = ele.getValidationMessage(
                getErrorMessageTemplates(ele),
                inputEl,
            );
            expect(msg).toEqual(defaultValidation);
        });
    });

    describe('disabledValidation', () => {
        it('disables validation when set at field level', async () => {
            page = await newSpecPage({
                components: [Field, Input],
                html: `
                    <example-field label="Test" disabled-validation>
                        <example-input required></example-input>
                    </example-field>
                `,
            });

            ele = page.rootInstance;

            expect(ele.validate).toBe(false);
        });

        it('disables validation when set at form level', async () => {
            page = await newSpecPage({
                components: [Field, Input],
                html: `
                    <example-form disabled-validation>
                        <example-field label="Test">
                            <example-input required></example-input>
                        </example-field>
                    </example-form>
                `,
            });

            ele = page.rootInstance;
            expect(ele.validate).toBe(false);
        });
    });

    describe('methods', () => {
        const mockEle = {
            value: '',
            element: {
                tagName: 'EXAMPLE-INPUT',
                type: 'text',
                required: true,
                name: 'input1',
                id: 'input1',
                value: '',
            },
            name: 'input1',
            type: 'text',
            required: true,
            error: '',
            label: '',
        };

        describe('registerInputElement', () => {
            beforeEach(async () => {
                await ele.registerInputElement(mockEle);
                await page.waitForChanges();
            });

            describe('when element is not already present', () => {
                it('registers a new element', async () => {
                    expect(ele.fieldElements.length).toBe(2);
                    expect(ele.required).toBe(true);
                });
            });

            describe('when element is already present', () => {
                it('does not register it again', async () => {
                    await ele.registerInputElement(mockEle);
                    await page.waitForChanges();
                    expect(ele.fieldElements.length).toBe(2);
                });
            });
        });

        describe('unregisterInputElement', () => {
            beforeEach(async () => {
                ele.fieldElements = [mockEle];
                ele.errors = [{ targetId: 'input1', message: 'Error message' }];
                await page.waitForChanges();
                await ele.unregisterInputElement(mockEle);
            });

            it('unregisters the element', async () => {
                expect(ele.fieldElements.length).toBe(0);
                expect(ele.required).toBe(false);
                expect(ele.errors.length).toBe(0);
            });
        });

        describe('resetField', () => {
            it('clears the errors', async () => {
                ele.errors = [{ targetId: 'input1', message: 'Error message' }];
                await page.waitForChanges();
                await ele.resetField();
                await page.waitForChanges();
                setTimeout(() => {
                    expect(ele.errors.length).toBe(0);
                }, 100);
            });
        });
    });
});
