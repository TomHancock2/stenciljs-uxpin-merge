import { Component, ComponentInterface, Prop, h, Host } from '@stencil/core';

import { LabelCssClass } from './label.types';
import { focusOnElement } from '../../utils/helpers';

/**
 * @slot - Additional label content - Appears after the label text
 */
@Component({
    scoped: true,
    styleUrl: 'styles/label.css',
    tag: 'example-label',
})
export class Label implements ComponentInterface {
    /**
     * Id of input that the label is labelling
     */
    @Prop() for = '';

    /**
     * Visually hides the label text, but still available to screen readers
     */
    @Prop() hiddenLabel = false;

    /**
     * When set to true, the 'required asterisk (*)' is displayed next to the label text
     */
    @Prop() required = false;

    /**
     * When set to true, the text '(optional)' is displayed next to the label text.
     * Will be ignored if `required` is `true`
     */
    @Prop() optional = false;

    /**
     * Text that is read by a screen reader for a required field
     */
    @Prop() optionalText = '(optional)';

    /**
     * Text to be displayed in the label.
     * This can form part of error messages to make sure it makes sense in this context
     */
    @Prop() labelText!: string;

    /**
     * When true, element in the `for` will be focused on (for CheckboxGroup and RadioGroup)
     */
    @Prop() focusOn? = false;

    render() {
        return (
            <Host
                class={{
                    [LabelCssClass.Base]: true,
                    [LabelCssClass.HiddenLabel]: this.hiddenLabel,
                }}
            >
                <label
                    class={LabelCssClass.Label}
                    htmlFor={this.for}
                    onClick={this.focusOn ? focusOnElement : null}
                >
                    <div>
                        {this.required && (
                            <span
                                class={LabelCssClass.Required}
                                aria-hidden="true"
                            >
                                *
                            </span>
                        )}
                        <span class={LabelCssClass.LabelText}>
                            {this.labelText}
                        </span>
                        {!this.required && this.optional && (
                            <span class={LabelCssClass.Optional}>
                                {this.optionalText}
                            </span>
                        )}
                        <slot />
                    </div>
                </label>
            </Host>
        );
    }
}
