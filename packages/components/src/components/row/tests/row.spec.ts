import { newSpecPage } from '@stencil/core/testing';

import { Row, RowGutter, RowHorizontalAlign, RowVerticalAlign } from '../';

describe('row', () => {
    let page, component, ele;
    beforeEach(async () => {
        page = await newSpecPage({
            components: [Row],
            html: `<div></div>`,
        });
        component = page.doc.createElement('example-row');

        // Act
        page.root.appendChild(component);
        await page.waitForChanges();
        ele = page.rootInstance;
    });
    it('builds', () => {
        expect(ele).toBeTruthy();
    });

    it('renders with defaults', async () => {
        expect(ele.gutter).toBe(RowGutter.None);
        expect(ele.horizontalAlign).toBe(RowHorizontalAlign.Left);
        expect(ele.verticalAlign).toBe(RowVerticalAlign.Top);
    });
});
