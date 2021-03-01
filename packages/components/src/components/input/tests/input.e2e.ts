import { newE2EPage } from '@stencil/core/testing';

import { InputCssClass } from '../';
import * as axe from '../../../../../../test-utils/axe';

describe('example-input', () => {
    describe('basic', () => {
        it('renders', async () => {
            const page = await newE2EPage();
            await page.setContent(
                '<example-input id="test" class="test"></example-input>',
            );

            const element = await page.find('example-input');
            const input = await page.find('example-input input');
            expect(element).toHaveClasses([
                'hydrated',
                InputCssClass.Base,
                'test',
            ]);
            expect(input).toHaveClass(InputCssClass.NativeInput);
            expect(input.getAttribute('type')).toBe('text');
        });
    });

    describe('props', () => {
        describe('watermark', () => {
            it('adds the watermark class', async () => {
                const page = await newE2EPage();
                await page.setContent('<example-input watermark></example-input>');

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.Watermark);
            });
        });
        describe('clearable', () => {
            it('adds the clearable class', async () => {
                const page = await newE2EPage();
                await page.setContent(
                    '<example-input clearable value="Initial value"></example-input>',
                );
                const element = await page.find('example-input');

                const wrappingClass = await page.find(
                    `.${InputCssClass.Clearable}`,
                );
                const clearElement = await page.find(`.${InputCssClass.Clear}`);

                expect(wrappingClass).toBeTruthy();
                expect(clearElement).toBeTruthy();
                expect(element).toHaveClass(InputCssClass.Clearable);
            });
        });
        describe('width', () => {
            it('adds the width 2 class', async () => {
                const page = await newE2EPage();
                await page.setContent('<example-input width="2"></example-input>');

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.Width2);
            });
            it('adds the width 4 class', async () => {
                const page = await newE2EPage();
                await page.setContent('<example-input width="4"></example-input>');

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.Width4);
            });
            it('adds the width 6 class', async () => {
                const page = await newE2EPage();
                await page.setContent('<example-input width="6"></example-input>');

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.Width6);
            });
            it('adds the width 8 class', async () => {
                const page = await newE2EPage();
                await page.setContent('<example-input width="8"></example-input>');

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.Width8);
            });
            it('adds the width 10 class', async () => {
                const page = await newE2EPage();
                await page.setContent('<example-input width="10"></example-input>');

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.Width10);
            });
            it('adds the width 12 class', async () => {
                const page = await newE2EPage();
                await page.setContent('<example-input width="12"></example-input>');

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.Width12);
            });
            it('adds the width 16 class', async () => {
                const page = await newE2EPage();
                await page.setContent('<example-input width="16"></example-input>');

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.Width16);
            });
            it('adds the width 25% class', async () => {
                const page = await newE2EPage();
                await page.setContent(
                    '<example-input width="25Perc"></example-input>',
                );

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.Width25Perc);
            });
            it('adds the width 50% class', async () => {
                const page = await newE2EPage();
                await page.setContent(
                    '<example-input width="50Perc"></example-input>',
                );

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.Width50Perc);
            });
            it('adds the width 75% class', async () => {
                const page = await newE2EPage();
                await page.setContent(
                    '<example-input width="75Perc"></example-input>',
                );

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.Width75Perc);
            });
        });

        describe('label', () => {
            it('renders a label', async () => {
                const page = await newE2EPage();
                await page.setContent(
                    '<example-input multi-input-label="Test label" name="test-input"></example-input>',
                );
                const label = await page.find('example-label');

                expect(label).toHaveClass(InputCssClass.Label);
                expect(label.innerText).toBe('Test label');
            });
        });

        describe('hiddenLabel', () => {
            it('adds the hiddenLabel class', async () => {
                const page = await newE2EPage();
                await page.setContent(
                    '<example-input mutli-input-label="Test label" hidden-label></example-input>',
                );

                const element = await page.find('example-input');
                expect(element).toHaveClass(InputCssClass.HiddenLabel);
            });
        });

        describe('required', () => {
            it('makes the input required', async () => {
                const page = await newE2EPage();
                await page.setContent('<example-input required></example-input>');

                await page.waitForChanges();

                const input = await page.find('example-input input');
                expect(input.getAttribute('required')).toBe('');
            });
        });
    });
    describe('slots', () => {
        let page;
        beforeEach(async () => {
            page = await newE2EPage();
        });
        it('adds prepend slot', async () => {
            await page.setContent(
                `<example-input required>
                    <example-icon name="envelope" iconTitle="Email" slot="prepend"></example-icon>
                </example-input>`,
            );
            await page.waitForChanges();
            const element = await page.find('example-input');
            const slottedContent = await page.find(
                `.${InputCssClass.Prepend} .fa-envelope`,
            );

            expect(element).toHaveClass(InputCssClass.Prepend);
            expect(slottedContent).toBeTruthy();
        });
        it('adds append slot', async () => {
            await page.setContent(
                `<example-input required>
                    <example-icon name="envelope" iconTitle="Email" slot="append"></example-icon>
                </example-input>`,
            );
            await page.waitForChanges();
            const element = await page.find('example-input');
            const slottedContent = await page.find(
                `.${InputCssClass.Append} .fa-envelope`,
            );

            expect(element).toHaveClass(InputCssClass.Append);
            expect(slottedContent).toBeTruthy();
        });
    });    
});
