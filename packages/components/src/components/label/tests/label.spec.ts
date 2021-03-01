import { newSpecPage } from '@stencil/core/testing';

import { Label, LabelCssClass } from '../';

describe('Label', () => {
    describe('basic', () => {
        let page, component, ele;
        beforeEach(async () => {
            page = await newSpecPage({
                components: [Label],
                html: `<div></div>`,
            });
            component = page.doc.createElement('example-label');
            component.labelText = 'Test label';

            // Act
            page.root.appendChild(component);
            await page.waitForChanges();
            ele = page.rootInstance;
        });

        it('builds', () => {
            expect(ele).toBeTruthy();
        });

        it('renders with defaults', async () => {
            expect(ele.for).toBe('');
            expect(ele.required).toBe(false);
            expect(ele.optional).toBe(false);
            expect(ele.optionalText).toBe('(optional)');
            expect(ele.labelText).toBe('Test label');
        });
    });

    it('renders the required asterisk (and screen reader text)', async () => {
        // Arrange
        const page = await newSpecPage({
            components: [Label],
            html: `<div></div>`,
        });
        const component = page.doc.createElement('example-label');
        component.labelText = 'Test label';
        component.required = true;

        // Act
        page.root.appendChild(component);
        await page.waitForChanges();
        const requiredEle = page.body.querySelector(
            `.${LabelCssClass.Required}`,
        );

        // Assert
        expect(requiredEle.textContent).toBe('*');
    });

    it('renders the text "(optional)" next to the label text', async () => {
        // Arrange
        const page = await newSpecPage({
            components: [Label],
            html: `<div></div>`,
        });
        const component = page.doc.createElement('example-label');
        component.labelText = 'Test label';
        component.optional = true;

        // Act
        page.root.appendChild(component);
        await page.waitForChanges();
        const optionalEle = page.body.querySelector(
            `.${LabelCssClass.Optional}`,
        );

        // Assert
        expect(optionalEle.textContent).toBe('(optional)');
    });
});
