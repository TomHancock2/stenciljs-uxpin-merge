import { E2EElement, newE2EPage } from '@stencil/core/testing';
import { ColCssClass, ColOffset, ColSpan } from '../';
import { getResponsiveLayoutPropTestCases } from '../../../utils/helpers';

const content = `<p>Some text</p>`;
const cssClass = 'test';

const renderCol = async (span?, offset?): Promise<E2EElement> => {
    const page = await newE2EPage();
    const spanAttr = span ? `span='${span}'` : null;
    const offsetAttr = offset ? `offset='${offset}'` : null;
    await page.setContent(
        `<example-col class=${cssClass} id="testId" ${spanAttr} ${offsetAttr}>${content}</example-col>`,
    );

    return await page.find(`.${ColCssClass.Base}`);
};

describe('Column', () => {
    it('renders', async () => {
        const element = await renderCol();

        expect(element).toHaveClasses(['hydrated', 'test', ColCssClass.Base]);
    });

    describe('props', () => {
        describe('span', () => {
            it(`adds the default span class if span isn't set`, async () => {
                const element = await renderCol();

                expect(element).toHaveClass(
                    `${ColCssClass.Span}--${ColSpan.Auto}`,
                );
            });

            const singleSpanTestCases = [];
            Object.keys(ColSpan).forEach((colSpanName) => {
                const colSpanVal = ColSpan[colSpanName];
                singleSpanTestCases.push([colSpanVal, { span: colSpanVal }]);
            });

            it.each(singleSpanTestCases)(
                `adds the correct single span class - %s`,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                async (_testName: string, data: any) => {
                    const element = await renderCol(data.span);

                    expect(element).toHaveClass(
                        `example-col__span--${data.span}`,
                    );
                },
            );

            const twoColSpanTestCases = getResponsiveLayoutPropTestCases(
                'span',
                ColSpan,
                2,
            );
            it.each(twoColSpanTestCases)(
                `adds the correct responsive span classes - two options - %#`,
                async (data) => {
                    const span = `["${data['span'][0]}", "${data['span'][1]}"]`;
                    const element = await renderCol(span);

                    const expectedClasses = [
                        `example-col__span-xs--${data['span'][0]}`,
                        `example-col__span-sm--${data['span'][1]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );

            const threeColSpanTestCases = getResponsiveLayoutPropTestCases(
                'span',
                ColSpan,
                3,
            );
            it.each(threeColSpanTestCases)(
                `adds the correct responsive span classes - three options - %#`,
                async (data) => {
                    const span = `["${data['span'][0]}", "${data['span'][1]}", "${data['span'][2]}"]`;
                    const element = await renderCol(span);

                    const expectedClasses = [
                        `example-col__span-xs--${data['span'][0]}`,
                        `example-col__span-sm--${data['span'][1]}`,
                        `example-col__span-md--${data['span'][2]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );

            const fourColSpanTestCases = getResponsiveLayoutPropTestCases(
                'span',
                ColSpan,
                4,
            );
            it.each(fourColSpanTestCases)(
                `adds the correct responsive span classes - four options - %#`,
                async (data) => {
                    const span = `["${data['span'][0]}", "${data['span'][1]}", "${data['span'][2]}", "${data['span'][3]}"]`;
                    const element = await renderCol(span);

                    const expectedClasses = [
                        `example-col__span-xs--${data['span'][0]}`,
                        `example-col__span-sm--${data['span'][1]}`,
                        `example-col__span-md--${data['span'][2]}`,
                        `example-col__span-lg--${data['span'][3]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );

            const fiveColSpanTestCases = getResponsiveLayoutPropTestCases(
                'span',
                ColSpan,
                5,
            );
            it.each(fiveColSpanTestCases)(
                `adds the correct responsive span classes - five options - %#`,
                async (data) => {
                    const span = `["${data['span'][0]}", "${data['span'][1]}", "${data['span'][2]}", "${data['span'][3]}", "${data['span'][4]}"]`;
                    const element = await renderCol(span);

                    const expectedClasses = [
                        `example-col__span-xs--${data['span'][0]}`,
                        `example-col__span-sm--${data['span'][1]}`,
                        `example-col__span-md--${data['span'][2]}`,
                        `example-col__span-lg--${data['span'][3]}`,
                        `example-col__span-xl--${data['span'][4]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );
        });

        describe('offset', () => {
            it(`doesn't add an offset class if offset isn't set`, async () => {
                const element = await renderCol();

                expect(
                    element.outerHTML.indexOf(`${ColCssClass.Offset}--`),
                ).toBe(-1);
            });

            const singleOffsetTestCases = [];
            Object.keys(ColOffset).forEach((ColOffsetName) => {
                const ColOffsetVal = ColOffset[ColOffsetName];
                singleOffsetTestCases.push([
                    ColOffsetVal,
                    { offset: ColOffsetVal },
                ]);
            });

            it.each(singleOffsetTestCases)(
                `adds the correct single offset class - %s`,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                async (_testName: string, data: any) => {
                    const element = await renderCol(null, data.offset);

                    expect(element).toHaveClass(
                        `example-col__offset--${data.offset}`,
                    );
                },
            );

            const twoColOffsetTestCases = getResponsiveLayoutPropTestCases(
                'offset',
                ColOffset,
                2,
            );
            it.each(twoColOffsetTestCases)(
                `adds the correct responsive offset classes - two options - %#`,
                async (data) => {
                    const offset = `["${data['offset'][0]}", "${data['offset'][1]}"]`;
                    const element = await renderCol(null, offset);

                    const expectedClasses = [
                        `example-col__offset-xs--${data['offset'][0]}`,
                        `example-col__offset-sm--${data['offset'][1]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );

            const threeColOffsetTestCases = getResponsiveLayoutPropTestCases(
                'offset',
                ColOffset,
                3,
            );
            it.each(threeColOffsetTestCases)(
                `adds the correct responsive offset classes - three options - %#`,
                async (data) => {
                    const offset = `["${data['offset'][0]}", "${data['offset'][1]}", "${data['offset'][2]}"]`;
                    const element = await renderCol(null, offset);

                    const expectedClasses = [
                        `example-col__offset-xs--${data['offset'][0]}`,
                        `example-col__offset-sm--${data['offset'][1]}`,
                        `example-col__offset-md--${data['offset'][2]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );

            const fourColOffsetTestCases = getResponsiveLayoutPropTestCases(
                'offset',
                ColOffset,
                4,
            );
            it.each(fourColOffsetTestCases)(
                `adds the correct responsive offset classes - four options - %#`,
                async (data) => {
                    const offset = `["${data['offset'][0]}", "${data['offset'][1]}", "${data['offset'][2]}", "${data['offset'][3]}"]`;
                    const element = await renderCol(null, offset);

                    const expectedClasses = [
                        `example-col__offset-xs--${data['offset'][0]}`,
                        `example-col__offset-sm--${data['offset'][1]}`,
                        `example-col__offset-md--${data['offset'][2]}`,
                        `example-col__offset-lg--${data['offset'][3]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );

            const fiveColOffsetTestCases = getResponsiveLayoutPropTestCases(
                'offset',
                ColOffset,
                4,
            );
            it.each(fiveColOffsetTestCases)(
                `adds the correct responsive offset classes - five options - %#`,
                async (data) => {
                    const offset = `["${data['offset'][0]}", "${data['offset'][1]}", "${data['offset'][2]}", "${data['offset'][3]}", "${data['offset'][4]}"]`;
                    const element = await renderCol(null, offset);

                    const expectedClasses = [
                        `example-col__offset-xs--${data['offset'][0]}`,
                        `example-col__offset-sm--${data['offset'][1]}`,
                        `example-col__offset-md--${data['offset'][2]}`,
                        `example-col__offset-lg--${data['offset'][3]}`,
                        `example-col__offset-xl--${data['offset'][4]}`,
                    ];
                    expect(element).toHaveClasses(expectedClasses);
                },
            );
        });
    });
});
