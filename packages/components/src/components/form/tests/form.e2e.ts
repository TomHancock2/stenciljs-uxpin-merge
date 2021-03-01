import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

import { FormCssClass } from '../';
import * as axe from '../../../../../../test-utils/axe';
import { GlobalCssClass } from '../../../utils/interfaces';
import { FormSlot } from '../form.types';

describe('example-form', () => {
    describe('basic', () => {
        it('renders', async () => {
            const page = await newE2EPage();
            await page.setContent(
                '<example-form id="test" class="test"></example-form>',
            );

            const element = await page.find('example-form');
            const header = await page.find(`.${FormCssClass.Header}`);
            const footer = await page.find(`.${FormCssClass.Header}`);
            expect(element).toHaveClasses([
                'hydrated',
                FormCssClass.Base,
                'test',
            ]);
            expect(header).toBeFalsy();
            expect(footer).toBeFalsy();
        });
    });

    describe('slots', () => {
        it('renders the relevant slot & content when passed', async () => {
            const page = await newE2EPage();
            await page.setContent(`
                <example-form id="test" class="test">
                    <example-text slot="${FormSlot.Header}">Form heading</example-text>
                    <example-button slot="${FormSlot.Footer}">Submit</example-button>
                    <example-alert slot="${FormSlot.Alert}">There were validation errors</example-alert>
                </example-form>
            `);

            const header = await page.find(
                `.${FormCssClass.Header} example-text`,
            );
            const footer = await page.find(
                `.${FormCssClass.Footer} example-button`,
            );
            const alert = await page.find(`.${FormCssClass.Alert} example-alert`);
            expect(header).toBeTruthy();
            expect(footer).toBeTruthy();
            expect(alert).toBeTruthy();
        });

        describe('validation is disabled', () => {
            it('alert slot is not hidden - does not have sr-only class', async () => {
                const page = await newE2EPage();
                await page.setContent(`
                    <example-form id="test" class="test" disabled-validation>
                        <example-alert slot="${FormSlot.Alert}">There were validation errors</example-alert>
                    </example-form>
                `);

                const alert = await page.find(`[role="alert"]`);
                expect(alert).not.toHaveClass(GlobalCssClass.SROnly);
            });
        });
    });

    describe('methods', () => {
        let page: E2EPage;
        let formEle: E2EElement;
        let inputEle: E2EElement;

        beforeEach(async () => {
            page = await newE2EPage({
                html: `
                    <example-form>
                        <example-input name="test" required></example-input>
                        <example-input name="test-textarea" rows="4"></example-input>
                        <example-field label="Checkbox group">
                            <example-checkbox-group name="cb-group">
                                <example-checkbox value="opt1">Option 1</example-checkbox>
                                <example-checkbox value="opt2">Option 2</example-checkbox>
                            </example-checkbox-group>
                        </example-field>
                    </example-form>
                `,
            });
            formEle = await page.find('example-form');
            inputEle = await page.find('example-input[name="test"]');
        });

        describe('submit', () => {
            it('triggers validation', async () => {
                // arrange
                const spy = await page.spyOnEvent('exampleFormInvalid');

                // act
                await formEle.callMethod('submit');
                await page.waitForChanges();

                // assert
                expect(spy).toHaveReceivedEventTimes(1);
                expect(spy).toHaveReceivedEventDetail([
                    {
                        message: 'Field #1 is a required field',
                        targetId: 'test',
                    },
                ]);
            });

            it('emits a submit event when valid', async () => {
                // arrange
                const spy = await page.spyOnEvent('exampleFormSubmit');

                // act
                inputEle.setProperty('value', 'test value');
                await page.waitForChanges();

                await formEle.callMethod('submit');
                await page.waitForChanges();

                // assert
                expect(spy).toHaveReceivedEventTimes(1);
                expect(spy).toHaveReceivedEventDetail({
                    test: 'test value',
                    'test-textarea': '',
                    'cb-group': [],
                });
            });
        });

        describe('reset', () => {
            it('clears the values in the form', async () => {
                // arrange
                const textareaEle = await page.find(
                    'example-input[name="test-textarea"]',
                );
                const input = await page.find('input');
                const textarea = await page.find('textarea');
                inputEle.setProperty('value', 'test value');
                textareaEle.setProperty('value', 'test textarea value');
                await page.waitForChanges();

                // act
                await formEle.callMethod('reset');
                await page.waitForChanges();

                // assert
                const inputVal = await input.getProperty('value');
                expect(inputVal).toBe('');
                expect(textarea.innerHTML).toBe('');
            });
        });
    });   
});
