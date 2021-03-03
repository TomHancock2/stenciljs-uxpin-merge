import { Component, h, Host, Prop, ComponentInterface } from '@stencil/core';
import { ColCssClass, ColOffset, ColSpan, ColAlignSelf } from './col.types';
import {
    getResponsiveValuesFromProp,
    getResponsiveLayoutClasses,
} from '../../utils/helpers';

/**
 * @slot - Column content
 */
@Component({
    tag: 'example-col',
    styleUrl: 'styles/col.css',
    shadow: true,
})
export class Column implements ComponentInterface {
    /**
     * Individual alignment of column
     */
    @Prop({ reflect: true }) alignSelf?: ColAlignSelf;

    /**
     * Number of columns to span.
     */
    @Prop({ reflect: true }) span?: ColSpan | ColSpan[] = ColSpan.Auto;

    /**
     * Number of columns to offset.
     */
    @Prop({ reflect: true }) offset?: ColOffset | ColOffset[];

    render() {
        const colSpanValues = getResponsiveValuesFromProp(this.span);
        const colOffsetValues = getResponsiveValuesFromProp(this.offset);
        const spanClasses = getResponsiveLayoutClasses(
            colSpanValues,
            ColCssClass,
            'Span',
        );
        const offsetClasses = getResponsiveLayoutClasses(
            colOffsetValues,
            ColCssClass,
            'Offset',
        );

        return (
            <Host
                class={{
                    [ColCssClass.Base]: true,
                    ...spanClasses,
                    ...offsetClasses,
                }}
            >
                <slot />
            </Host>
        );
    }
}
