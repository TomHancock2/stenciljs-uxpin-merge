import { E2EElement, newE2EPage } from '@stencil/core/testing';

import {
    RowCssClasses,
    RowGutter,
    RowHorizontalAlign,
    RowVerticalAlign,
} from '../row.types';
import { getResponsiveLayoutPropTestCases } from '../../../utils/helpers';

const renderRow = async (
    verticalAlign?: RowVerticalAlign,
    horizontalAlign?: RowHorizontalAlign,
    gutter?,
): Promise<E2EElement> => {
    const page = await newE2EPage();
    const gutterAttr = gutter ? `gutter='${gutter}'` : null;
    const alignAttr =
        verticalAlign !== undefined
            ? `vertical-align='${verticalAlign}'`
            : null;
    const justifyAttr =
        horizontalAlign !== undefined
            ? `horizontal-align='${horizontalAlign}'`
            : null;
    await page.setContent(
        `<example-row class="test" id="testId" ${alignAttr} ${gutterAttr} ${justifyAttr}>Here is a row</example-row>`,
    );

    return await page.find('example-row');
};

describe('example-row', () => {
    describe('basic', () => {
        it('renders', async () => {
            const element = await renderRow();

            expect(element).toHaveClasses([
                'hydrated',
                'test',
                RowCssClasses.Base,
            ]);
        });
    });

    describe('props', () => {
        describe('align-items', () => {
            it('adds the correct align items class', async () => {
                const element = await renderRow(RowVerticalAlign.Top);

                expect(element).toHaveClass(
                    `${RowCssClasses.VerticalAlign}--${RowVerticalAlign.Top}`,
                );
            });
        });

        describe('justify-content', () => {
            it('adds the correct justify content class', async () => {
                const element = await renderRow(
                    null,
                    RowHorizontalAlign.Center,
                );

                expect(element).toHaveClass(
                    `${RowCssClasses.HorizontalAlign}--${RowHorizontalAlign.Center}`,
                );
            });
        });

        describe('gutter', () => {
            it(`adds the default gutter class if gutter isn't set`, async () => {
                const element = await renderRow();

                expect(element).toHaveClass(
                    `${RowCssClasses.Gutter}--${RowGutter.None}`,
                );
            });

            const singleGutterSizeTestCases = [];
            Object.keys(RowGutter).forEach((gutterName) => {
                const gutterVal = RowGutter[gutterName];
                singleGutterSizeTestCases.push([
                    gutterVal,
                    { gutterSize: gutterVal },
                ]);
            });

            it.each(singleGutterSizeTestCases)(
                `adds the correct single gutter class - %s`,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                async (_testName: string, data: any) => {
                    const element = await renderRow(
                        null,
                        null,
                        data.gutterSize,
                    );

                    expect(element).toHaveClass(
                        `example-row__gutter--${data.gutterSize}`,
                    );
                },
            );

            const twoGutterSizeTestCases = getResponsiveLayoutPropTestCases(
                'gutter',
                RowGutter,
                2,
            );
            it.each(twoGutterSizeTestCases)(
                `adds the correct responsive gutter classes - two options - %#`,
                async (data) => {
                    const gutter = `["${data['gutter'][0]}", "${data['gutter'][1]}"]`;
                    const element = await renderRow(null, null, gutter);

                    const expectedClasses = [
                        `example-row__gutter-xs--${data['gutter'][0]}`,
                        `example-row__gutter-sm--${data['gutter'][1]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );

            const threeGutterSizeTestCases = getResponsiveLayoutPropTestCases(
                'gutter',
                RowGutter,
                3,
            );
            it.each(threeGutterSizeTestCases)(
                `adds the correct responsive gutter classes - three options - %#`,
                async (data) => {
                    const gutter = `["${data['gutter'][0]}", "${data['gutter'][1]}", "${data['gutter'][2]}"]`;
                    const element = await renderRow(null, null, gutter);

                    const expectedClasses = [
                        `example-row__gutter-xs--${data['gutter'][0]}`,
                        `example-row__gutter-sm--${data['gutter'][1]}`,
                        `example-row__gutter-md--${data['gutter'][2]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );

            const fourGutterSizeTestCases = getResponsiveLayoutPropTestCases(
                'gutter',
                RowGutter,
                4,
            );
            it.each(fourGutterSizeTestCases)(
                `adds the correct responsive gutter classes - four options - %#`,
                async (data) => {
                    const gutter = `["${data['gutter'][0]}", "${data['gutter'][1]}", "${data['gutter'][2]}", "${data['gutter'][3]}"]`;
                    const element = await renderRow(null, null, gutter);

                    const expectedClasses = [
                        `example-row__gutter-xs--${data['gutter'][0]}`,
                        `example-row__gutter-sm--${data['gutter'][1]}`,
                        `example-row__gutter-md--${data['gutter'][2]}`,
                        `example-row__gutter-lg--${data['gutter'][3]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );

            const fiveGutterSizeTestCases = getResponsiveLayoutPropTestCases(
                'gutter',
                RowGutter,
                5,
            );
            it.each(fiveGutterSizeTestCases)(
                `adds the correct responsive gutter classes - five options - %#`,
                async (data) => {
                    const gutter = `["${data['gutter'][0]}", "${data['gutter'][1]}", "${data['gutter'][2]}", "${data['gutter'][3]}", "${data['gutter'][4]}"]`;
                    const element = await renderRow(null, null, gutter);

                    const expectedClasses = [
                        `example-row__gutter-xs--${data['gutter'][0]}`,
                        `example-row__gutter-sm--${data['gutter'][1]}`,
                        `example-row__gutter-md--${data['gutter'][2]}`,
                        `example-row__gutter-lg--${data['gutter'][3]}`,
                        `example-row__gutter-xl--${data['gutter'][4]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );
        });
    });
});
