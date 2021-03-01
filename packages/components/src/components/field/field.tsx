import {
    Component,
    ComponentInterface,
    Prop,
    h,
    Host,
    Element,
    Event,
    EventEmitter,
    Listen,
    Method,
    State,
    Watch,
} from '@stencil/core';

import {
    getErrorMessageTemplates,
    getValidationMessage as formatErrorMessage,
} from '../form/form.helpers';
import {
    FieldAttributes,
    FieldCssClass,
    FieldLabelProps,
    NativeFormElement,
} from './field.types';
import { LabelCssClass } from '../label';
import {
    ErrorMessageTemplates,
    GlobalCssClass,
    ValidationMessage,
    FormFieldStatus,
    InputEventStatus,
} from '../../utils/interfaces';
import { hasFocus } from '../../utils/helpers';

/**
 * @slot - Content is place after the label and any error messages. This should contain form controls.
 **/
@Component({
    scoped: true,
    styleUrl: 'styles/field.css',
    tag: 'example-field',
})
export class Field implements ComponentInterface {
    private fieldElements: NativeFormElement[] = [];
    private forinput?: string;
    private form?: HTMLExampleFormElement;
    private validate = true;

    @Element() el!: HTMLExampleFieldElement;

    @State() errors: ValidationMessage[] = [];
    @State() required = null;
    @State() firstErrIndex = 0;
    @State() optional = false;

    /**
     * Error text for when using as a controlled component
     */
    @Prop() error? = '';
    @Watch('error')
    handleErrorChange(): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.fieldElements.forEach((item: any) => {
            const component = item.closest(`.${GlobalCssClass.FormElement}`);
            if (component) component.validate();
        });
    }

    /**
     * Setting to true will disable the validation on the field
     */
    @Prop() disabledValidation? = false;

    /**
     * Visually hides the label text, but still available to screenreaders
     */
    @Prop() hiddenLabel? = false;

    /**
     * Text to be displayed as supporting field description
     **/
    @Prop() hint?: string;

    /**
     * Displays multiple children in line rather than stacked.
     **/
    @Prop() inline?: boolean;

    /**
     * Text to be displayed in the label.
     * This can form part of error messages to make sure it makes sense in this context
     **/
    @Prop() label: string;

    /**
     * Removes margin from inline child components. Only activates when inline prop is also set.
     **/
    @Prop() join?: boolean;

    /**
     * Text that is added to a label to mark a field as optional
     */
    @Prop() optionalText? = '(optional)';
    /**
     * Error message to be displayed when the characters does fulfil
     * the pattern provided by the `pattern` prop. Defaults to HTML5 default message.
     */
    @Prop() patternMismatch?: string;

    /**
     * Error message to be displayed when the number value exceed the
     * `max` property. Defaults to HTML5 default message.
     */
    @Prop() rangeOverflow?: string;

    /**
     * Error message to be displayed when the number value is lower than
     * the `min` property. Defaults to HTML5 default message.
     */
    @Prop() rangeUnderflow?: string;

    /**
     * Error message to be displayed when the number of characters
     * exceed the `maxlength` property. Defaults to HTML5 default message.
     */
    @Prop() stepMismatch?: string;

    /**
     * Error message to be displayed when the number of characters
     * exceed the `maxlength` property. Defaults to HTML5 default message.
     */
    @Prop() tooLong?: string;

    /**
     * Error message to be displayed when there are not enough
     * characters to equal or exceed the `minlength` property. Defaults to HTML5 default message.
     */
    @Prop() tooShort?: string;

    /**
     * Error message to be displayed when the field value is not
     * the correct syntax. Defaults to HTML5 default message.
     */
    @Prop() typeMismatch?: string;

    /**
     * Error message to be displayed when the input is required and
     * no value has been entered. Defaults to HTML5 default message.
     */
    @Prop() valueMissing?: string;

    /**
     * Renders a fieldset if set to true
     */
    @Prop() inputGroup?: boolean = false;

    /**
     * Emitted when an input loads
     */
    @Event() exampleFieldDidLoad!: EventEmitter;

    /**
     * Emitted when an input is removed
     */
    @Event() exampleFieldDidUnload!: EventEmitter;

    // eslint-disable-next-line
    @Listen('focusout')
    blurHandler(): void {
        if (this.validate) {
            // Using setTimeout as focus is momentarily shifted to body before moving on
            setTimeout(() => {
                if (!hasFocus(this.el)) {
                    for (const el of this.fieldElements) {
                        if (el && !el.hasAttribute('readonly'))
                            this.updateErrors(el);
                    }
                    this.validateField();
                }
            }, 10);
        }
    }

    @Listen('exampleErrorChange')
    errorChangeHandler(): void {
        if (this.validate) {
            if (!hasFocus(this.el)) {
                for (const el of this.fieldElements) {
                    this.updateErrors(el);
                }
            }
        }
    }

    /**
     * Resets field to initial state
     */
    @Method()
    async resetField(): Promise<void> {
        setTimeout(() => {
            this.errors = [];
        }, 15);
    }

    /**
     * Validates the form elements
     */
    @Method()
    async validateField(): Promise<void> {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        this.fieldElements.forEach((ele: any) => {
            if (ele) {
                if (
                    ele.tagName.indexOf('EXAMPLE-') > -1 &&
                    ele.tagName.indexOf('-GROUP') > -1
                ) {
                    ele.validate();
                } else {
                    const component = ele.closest(
                        `.${GlobalCssClass.FormElement}`,
                    );
                    if (component) component.validate();
                }
            }
        });
    }

    /**
     * Registers input elements within field
     */
    @Method()
    async registerInputElement(
        fieldData: InputEventStatus | FormFieldStatus,
    ): Promise<void> {
        if (
            this.fieldElements.findIndex((ele) => ele.name === fieldData.name) <
            0
        ) {
            if (this.error !== '') {
                fieldData.element
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .closest(`.${GlobalCssClass.FormElement}` as any)
                    .validate();
            }
            this.fieldElements.push(fieldData.element as NativeFormElement);
            if (fieldData.required && !this.required) {
                this.required = true;
            } else {
                this.required = false;
            }
            this.setForInput();
        }
    }

    /**
     * Unregisters input elements within field
     */
    @Method()
    async unregisterInputElement(
        fieldData: FormFieldStatus | InputEventStatus,
    ): Promise<void> {
        const fieldIndex = this.fieldElements.findIndex(
            (ele) => ele.name === fieldData.name,
        );
        if (fieldIndex >= 0) {
            this.fieldElements.splice(fieldIndex, 1);
            const errorIndex = this.errors.findIndex(
                (error) => error.targetId === fieldData.name,
            );
            this.required =
                this.fieldElements.filter((ele) => ele.required === true)
                    .length > 0;
            this.setForInput();

            if (errorIndex >= 0) {
                this.removeError(errorIndex);
                for (const el of this.fieldElements) {
                    this.updateErrors(el);
                }
            }
        }
    }

    componentWillLoad(): void {
        this.form = this.el.closest('example-form');
        this.optional = this.hasOptionalFieldLabels();
        this.validate = !this.hasDisableValidation();
    }

    componentDidLoad(): void {
        this.exampleFieldDidLoad.emit();
    }

    disconnectedCallback(): void {
        this.exampleFieldDidUnload.emit();
    }

    private setForInput(): void {
        const firstChild =
            this.el.querySelector('.example-input:first-child input[id]') ||
            this.el.querySelector('.example-input:first-child textarea[id]');
        const newFor = firstChild !== null ? firstChild.getAttribute('id') : '';
        if (this.forinput === undefined) {
            this.forinput = newFor;
        } else {
            const label = this.el.querySelector('label');
            if (label !== null) label.setAttribute('for', newFor);
        }
    }

    private getValidationMessage = (
        errorMessages: ErrorMessageTemplates,
        ele: NativeFormElement,
    ): string => {
        let msg: string;
        Object.keys(errorMessages).forEach((errorKey): void => {
            if (ele.validity && ele.validity[errorKey]) {
                /* eslint-disable @typescript-eslint/no-explicit-any */
                msg = errorMessages[errorKey]
                    ? formatErrorMessage(errorMessages, ele as any, 0)
                    : ele.validationMessage;
                /* eslint-enable @typescript-eslint/no-explicit-any */
            }
        });
        return msg;
    };

    private hasDisableValidation = (): boolean => {
        if (this.disabledValidation) return true;
        return (
            this.form &&
            (this.form.getAttribute(FieldAttributes.DisabledValidation) ===
                'true' ||
                this.form.getAttribute(FieldAttributes.DisabledValidation) ===
                    '')
        );
    };

    private hasOptionalFieldLabels = (): boolean =>
        this.form &&
        (this.form.getAttribute(FieldAttributes.OptionalLabels) === 'true' ||
            this.form.getAttribute(FieldAttributes.OptionalLabels) === '');

    private updateErrors = async (el: NativeFormElement): Promise<void> => {
        if (this.error !== '' || el === undefined) return;
        const valid =
            el.tagName.indexOf('EXAMPLE-') > -1
                ? await el.checkValidity()
                : el.checkValidity();
        const message = this.getValidationMessage(
            getErrorMessageTemplates(this),
            el,
        );
        const nameIndex = this.errors.findIndex(
            (error) => error.targetId === el.name,
        );
        const existingMessage = this.errors.find(
            (error) => error.message === message,
        );

        if (valid !== true && existingMessage === undefined) {
            if (nameIndex >= 0) {
                this.updateError(nameIndex, message);
            } else {
                this.addError({
                    targetId: el.name,
                    message,
                });
            }
        }
        if (valid && nameIndex >= 0) {
            this.removeError(nameIndex);
        }

        const firstErr = this.el.querySelector(
            `.${GlobalCssClass.FormElementInvalid}`,
        );
        if (firstErr !== null && this.errors.length > 0) {
            const index = this.errors.findIndex(
                (err) => err.targetId === firstErr.getAttribute('name'),
            );
            this.firstErrIndex = index > -1 ? index : 0;
        }
    };

    private addError = (error: ValidationMessage): void => {
        this.errors = [...this.errors, error];
    };

    private updateError = (i: number, errorMessage: string): void => {
        const errors = [...this.errors];
        errors[i].message = errorMessage;
        this.errors = errors;
    };

    private removeError = (i: number): void => {
        const errors = [...this.errors];
        errors.splice(i, 1);
        this.errors = errors;
    };

    render() {
        const labelProps: FieldLabelProps = {
            for: this.forinput,
            focusOn: true,
            labelText: this.label,
            required: this.required && !this.optional,
            optional: this.optional && !this.required,
            optionalText: this.optionalText,
            hiddenLabel: this.hiddenLabel,
        };

        if (this.inputGroup) {
            delete labelProps.for;
            delete labelProps.focusOn;
        }

        const containerClasses = this.inline ? `` : `${FieldCssClass.Stack}`;

        const hasErrors = this.error || this.errors.length > 0;

        const legendText = (
            <span class={LabelCssClass.LabelText}>
                {labelProps.required && (
                    <span class={LabelCssClass.Required}>
                        <span aria-hidden="true">*</span>
                        <span class={GlobalCssClass.SROnly}>Required</span>
                    </span>
                )}
                {labelProps.labelText}
                {labelProps.optional && (
                    <span class={LabelCssClass.Optional}>
                        {this.optionalText}
                    </span>
                )}
            </span>
        );

        const getHintText = () => (
            <div class={FieldCssClass.Hint}>{this.hint}</div>
        );

        const getErrorContent = () => (
            <div class={FieldCssClass.Errors}>
                {this.error !== '' ||
                (this.errors.length > 0 && this.inputGroup === false) ? (
                    this.error || this.errors[this.firstErrIndex].message
                ) : null}
                {this.error === '' &&
                this.errors.length > 0 &&
                this.inputGroup === true ? (
                    this.errors
                ) : null}
            </div>
        );

        const slotWrapper = (
            <div class={`${FieldCssClass.InputContainer} ${containerClasses}`}>
                <slot />
            </div>
        );

        return (
            <Host
                class={{
                    [FieldCssClass.Base]: true,
                    [FieldCssClass.Inline]: this.inline === true,
                    [FieldCssClass.Stack]: this.inline !== true,
                    [FieldCssClass.Join]: this.join === true,
                    [FieldCssClass.Invalid]:
                        this.errors.length > 0 || this.error !== '',
                }}
            >
                {this.inputGroup ? (
                    <fieldset class={FieldCssClass.Wrapper}>
                        <legend
                            {...labelProps}
                            class={`${FieldCssClass.Legend} ${
                                this.hiddenLabel ? 'example-label--hidden' : ''
                            }`}
                        >
                            {legendText}
                            {this.hint && getHintText()}
                            {hasErrors && getErrorContent()}
                        </legend>
                        {slotWrapper}
                    </fieldset>
                ) : (
                    <div class={FieldCssClass.Wrapper}>
                        <example-label
                            {...labelProps}
                            class={
                                this.hiddenLabel ? 'example-label--hidden' : ''
                            }
                        >
                            {this.hint && getHintText()}
                            {hasErrors && getErrorContent()}
                        </example-label>
                        {slotWrapper}
                    </div>
                )}
            </Host>
        );
    }
}
