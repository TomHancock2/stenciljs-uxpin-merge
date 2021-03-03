import { Component, h, Prop, Host, ComponentInterface } from '@stencil/core';
import {
    RowCssClasses,
    RowGutter,
    RowHorizontalAlign,
    RowVerticalAlign,
} from './row.types';
import {
    getResponsiveValuesFromProp,
    getResponsiveLayoutClasses
} from '../../utils/helpers';

/**
 * @slot - Row content: expects `example-col`
 */
@Component({
    tag: 'example-row',
    styleUrl: 'styles/row.css',
    shadow: true,
})
export class Row implements ComponentInterface {
    /**
     * The amount of space between columns. If a single value is provided, this will be applied to all viewport sizes. If multiple values are provided, the first will apply to the small viewport upwards, the second to the medium viewport upwards, the third (if set) to the large viewport upwards, and the fourth (if set) to the extra large viewport.
     */
    @Prop() gutter?: RowGutter[] | RowGutter = RowGutter.None;

    /**
     * Horizontal alignment, follows flexbox justify-content
     */
    @Prop({ reflect: true }) horizontalAlign?: RowHorizontalAlign =
        RowHorizontalAlign.Left;

    /**
     * Vertical alignment, follows flexbox align-items
     */
    @Prop({ reflect: true }) verticalAlign?: RowVerticalAlign =
        RowVerticalAlign.Top;

    render() {
        const gutterValues = getResponsiveValuesFromProp(this.gutter);
        const gutterClasses = getResponsiveLayoutClasses(
            gutterValues,
            RowCssClasses,
            'Gutter',
        );

        return (
            <Host
                class={{
                    [RowCssClasses.Base]: true,
                    [`${RowCssClasses.VerticalAlign}--${this.verticalAlign}`]: true,
                    [`${RowCssClasses.HorizontalAlign}--${this.horizontalAlign}`]: true,
                    ...gutterClasses,
                }}
            >
                <slot />
            </Host>
        );
    }
}
