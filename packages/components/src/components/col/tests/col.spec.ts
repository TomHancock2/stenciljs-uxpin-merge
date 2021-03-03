import { newSpecPage } from '@stencil/core/testing';

import { Column, ColSpan } from '../';

describe('Column', () => {
    describe('basic', () => {
        let page, component, ele;
        beforeEach(async () => {
            page = await newSpecPage({
                components: [Column],
                html: `<div></div>`,
            });
            component = page.doc.createElement('example-col');

            // Act
            page.root.appendChild(component);
            await page.waitForChanges();
            ele = page.rootInstance;
        });
        it('builds', () => {
            expect(ele).toBeTruthy();
        });

        it('renders with defaults', async () => {
            expect(ele.span).toBe(ColSpan.Auto);
        });
    });
});
