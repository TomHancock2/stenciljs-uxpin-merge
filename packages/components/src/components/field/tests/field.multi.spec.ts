import { newSpecPage } from '@stencil/core/testing';

import { Field } from '../';
import { Input } from '../../input';

describe('Field', () => {
    let page;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let component: any;
    let inputEl: any;
    let exampleInputEl: any;
    let ele: any;
    /* eslint-enable @typescript-eslint/no-explicit-any */

    const inputName = 'inputName';
    const exampleInputName = 'exampleInputName';

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
        component.inputGroup = true;

        inputEl = page.doc.createElement('example-input');
        inputEl.name = inputName;
        inputEl.id = inputName;

        exampleInputEl = page.doc.createElement('example-input');
        exampleInputEl.name = exampleInputName;

        component.appendChild(inputEl);
        component.appendChild(exampleInputEl);

        page.root.appendChild(component);

        await page.waitForChanges();
        ele = page.rootInstance;
    });

    describe('basic', () => {
        it('builds', () => {
            expect(ele).toBeTruthy();
        });

        it('renders fieldset', async () => {
            await page.waitForChanges();
            expect(page.root.querySelector('fieldset')).toBeTruthy();
        });

        it('display validation summary when invalid', async () => {
            ele.errors = [
                {
                    targetId: inputName,
                    message: 'error',
                },
            ];
            await page.waitForChanges();
            const errorContainer = page.root.querySelector(
                'example-validation-summary',
            );
            expect(errorContainer).toBeTruthy();
        });
    });
});
