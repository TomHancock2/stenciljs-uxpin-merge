import { newE2EPage } from '@stencil/core/testing';

import { ContainerCssClass } from '../';

describe('example-container', () => {
    describe('basic', () => {
        it('renders', async () => {
            const page = await newE2EPage();
            await page.setContent(
                '<example-container id="test" class="test"></example-container>',
            );

            const element = await page.find('example-container');
            expect(element).toHaveClasses([
                'hydrated',
                ContainerCssClass.Base,
                'test',
            ]);
        });
    });

    describe('props', () => {
        describe('fluid', () => {
            it('adds the fluid class', async () => {
                const page = await newE2EPage();
                await page.setContent(
                    '<example-container fluid></example-container>',
                );

                const element = await page.find('example-container');
                expect(element).toHaveClass(ContainerCssClass.Fluid);
            });
        });
    });
});
