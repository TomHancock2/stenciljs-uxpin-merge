import { newE2EPage } from '@stencil/core/testing';

import { LabelCssClass } from '../';

describe('example-label', () => {
    describe('basic', () => {
        it('renders', async () => {
            const page = await newE2EPage();
            await page.setContent(
                '<example-label id="test" class="test" label-text="Label text"></example-label>',
            );

            const element = await page.find('example-label');
            expect(element).toHaveClasses([
                'hydrated',
                LabelCssClass.Base,
                'test',
            ]);
            expect(element.textContent).toBe('Label text');
        });
    });

    describe('props', () => {
        it('renders the required asterisk', async () => {
            const page = await newE2EPage();
            await page.setContent(
                '<example-label required label-text="Label text"></example-label>',
            );
            const element = await page.find(`.${LabelCssClass.Required}`);
            expect(element).not.toBeNull();
        });

        it('renders the required asterisk before the label text', async () => {
            const page = await newE2EPage();
            await page.setContent(
                '<example-label required label-text="Label text"></example-label>',
            );
            const element = await page.find(
                `.${LabelCssClass.Required} + .${LabelCssClass.LabelText}`,
            );
            expect(element).not.toBeNull();
        });

        it('renders the "(optional)" text', async () => {
            const page = await newE2EPage();
            await page.setContent(
                '<example-label optional label-text="Label text"></example-label>',
            );
            const element = await page.find(`.${LabelCssClass.Optional}`);
            expect(element).not.toBeNull();
        });

        it('renders the "(optional)" text after the label text', async () => {
            const page = await newE2EPage();
            await page.setContent(
                '<example-label optional label-text="Label text"></example-label>',
            );
            const element = await page.find(
                `.${LabelCssClass.LabelText} + .${LabelCssClass.Optional}`,
            );
            expect(element).not.toBeNull();
        });
    });
});
