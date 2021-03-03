import { newSpecPage } from '@stencil/core/testing';

import { Container } from '../container';

describe('Container', () => {
    describe('basic', () => {
        let page, component, ele;
        beforeEach(async () => {
            page = await newSpecPage({
                components: [Container],
                html: `<div></div>`,
            });
            component = page.doc.createElement('example-container');

            // Act
            page.root.appendChild(component);
            await page.waitForChanges();
            ele = page.rootInstance;
        });

        it('builds', () => {
            expect(ele).toBeTruthy();
        });

        it('renders with defaults', async () => {
            expect(ele.fluid).toBeFalsy();
        });
    });
});
