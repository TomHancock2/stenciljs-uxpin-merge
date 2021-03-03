import { Component, h, Host, Prop, ComponentInterface } from '@stencil/core';

import { ContainerCssClass } from './container.types';

/**
 * @slot - Container content
 */
@Component({
    tag: 'example-container',
    styleUrl: 'styles/container.css',
    shadow: true,
})
export class Container implements ComponentInterface {
    /**
     * Container stretches to fill the width of the browser window if true.
     */
    @Prop({ reflect: true }) fluid?: boolean;

    render() {
        return (
            <Host
                class={{
                    [ContainerCssClass.Base]: true,
                    [ContainerCssClass.Fluid]: this.fluid,
                }}
            >
                <slot />
            </Host>
        );
    }
}
