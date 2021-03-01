import {
    Component,
    ComponentInterface,
    Prop,
    Element,
    Event,
    EventEmitter,
    Method,
    h,
    Host,
    State,
} from '@stencil/core';

import {
    FormCssClass,
    FormMethod,
    FormDefaultText,
    FormSlot,
} from './form.types';
import {
    OnOff,
    FormData,
    ValidationMessage,
    GlobalCssClass,
    HeadingLevel,
} from '../../utils/interfaces';
import { nativeTestid, hasSlotContent } from '../../utils/helpers';
import {
    serializeForm,
    getErrorMessageTemplates,
    getErrorSummary,
} from './form.helpers';

/**
 * @slot - Form content
 * @slot footer - Section to place form controls (has a `class` of `example-form__footer`)
 * @slot header - Section to place form heading and intro text (has a `class` of `example-form__header`)
 * @slot alert - Section to place error summary when the app is in control of validation (has a `class` of `example-form__alert`)
 * @testId form - <form>
 */
@Component({
    scoped: true,
    styleUrl: 'styles/form.css',
    tag: 'example-form',
})
export class Form implements ComponentInterface {
    private nativeForm: HTMLFormElement;
    private hasAlertSlotContent: boolean;
    private hasHeaderSlotContent: boolean;
    private hasFooterSlotContent: boolean;

    @Element() el!: HTMLExampleFormElement;

    @State() errors: ValidationMessage[] = [];

    /**
     * A space- or comma-delimited list of character encodings that
     * the server accepts
     */
    @Prop() acceptCharset?: string;

    /**
     * The URI of a program that processes the form information
     */
    @Prop() action?: string;

    /**
     * If set to true, the form will submit to the server, if false,
     * that default behavior will be prevented and an ajax call can be made
     */
    @Prop() allowRedirect? = false;

    /**
     * Indicates whether input elements can by default have their
     * values automatically completed by the browser
     */
    @Prop() autocomplete?: OnOff = 'off';

    /**
     * Sets whether to use clear the form when successfully submitted or not.
     * Setting to true will leave the form fields populated.
     */
    @Prop() disabledClearOnSubmit? = false;

    /**
     * Sets whether to use default HTML 5 validation or not.
     * Setting to true will allow consumers to use their own validation engine
     */
    @Prop() disabledValidation? = false;

    /**
     * When the value of the method attribute is post, enctype is the MIME type
     * of content that is used to submit the form to the server
     */
    @Prop() enctype?: string;

    /**
     * Text to be displayed in the title of the error summary
     */
    @Prop() errorSummaryHeadingText?: string =
        FormDefaultText.ErrorSummaryHeading;

    /**
     * Level of error summary heading for semantics
     */
    @Prop() errorSummaryHeadingLevel?: HeadingLevel = HeadingLevel.H3;

    /**
     * Sets whether to show the error summary on submit.
     * Will be ignored if validate is false
     */
    @Prop() hiddenErrorSummary? = false;

    /**
     * The HTTP method that the browser uses to submit the form
     */
    @Prop() method?: FormMethod = 'get';

    /**
     * Name of the form
     */
    @Prop() name?: string;

    /**
     * When set to true, labels show an 'optional' label and not a required label
     */
    @Prop() optionalLabels?: boolean;

    /**
     * Error message to be displayed when the characters does fulfil
     * the pattern provided by the `pattern` prop.
     * {{fieldName}} is replaced by the text from the field's `label`
     */
    @Prop({ attribute: 'pattern-mismatch' }) patternMismatch?: string =
        FormDefaultText.PatternMismatch;

    /**
     * Error message to be displayed when the number value exceed the
     * `max` property.
     * {{fieldName}} and {{attrValue}} are replaced by the text from
     * the field's `label` and the value of `max` respectively.
     */
    @Prop({ attribute: 'range-overflow' }) rangeOverflow?: string =
        FormDefaultText.RangeOverflow;

    /**
     * Error message to be displayed when the number value is lower than
     * the `min` property.
     * {{fieldName}} and {{attrValue}} are replaced by the text from
     * the field's `label` and the value of `min` respectively.
     */
    @Prop({ attribute: 'range-underflow' }) rangeUnderflow?: string =
        FormDefaultText.RangeUnderflow;

    /**
     * A name or keyword indicating where to display the response
     * that is received after submitting the form
     */
    @Prop() target?: string;

    /**
     * Error message to be displayed when the number of characters
     * exceed the `maxlength` property.
     * {{fieldName}} and {{attrValue}} are replaced by the text from
     * the field's `label` and the value of `maxlength` respectively.
     */
    @Prop({ attribute: 'step-mismatch' }) stepMismatch?: string =
        FormDefaultText.StepMismatch;

    /**
     * Error message to be displayed when the number of characters
     * exceed the `maxlength` property.
     * {{fieldName}} and {{attrValue}} are replaced by the text from
     * the field's `label` and the value of `maxlength` respectively.
     */
    @Prop({ attribute: 'too-long' }) tooLong?: string = FormDefaultText.TooLong;

    /**
     * Error message to be displayed when there are not enough
     * characters to equal or exceed the `minlength` property.
     * {{fieldName}} and {{attrValue}} are replaced by the text from
     * the field's `label` and the value of `minlength` respectively.
     */
    @Prop({ attribute: 'too-short' }) tooShort?: string =
        FormDefaultText.TooShort;

    /**
     * Error message to be displayed when the field value is not
     * the correct syntax.
     * {{fieldName}} is replaced by the text from the field's `label`
     */
    @Prop({ attribute: 'type-mismatch' }) typeMismatch?: string =
        FormDefaultText.TypeMismatch;

    /**
     * Error message to be displayed when the input is required and
     * no value has been entered.
     * {{fieldName}} is replaced by the text from the field's `label`
     */
    @Prop({ attribute: 'value-missing' }) valueMissing?: string =
        FormDefaultText.ValueMissing;

    /**
     * Emitted when the value has changed. Contains a object element name and values.
     */
    @Event() exampleFormSubmit: EventEmitter<FormData>;

    /**
     * Emitted when the value has changed. Contains an `NameValueArray` where `name` and `value` are the `id` of the field and the associated error message.
     */
    @Event() exampleFormInvalid: EventEmitter<ValidationMessage[]>;

    /**
     * Programatically submit the form
     */
    @Method()
    async submit(): Promise<void> {
        this.onSubmit(false);
    }

    /**
     * Programatically reset the form
     */
    @Method()
    async reset(): Promise<void> {
        this.resetForm();
    }

    componentWillLoad(): void {
        this.hasAlertSlotContent = hasSlotContent(FormSlot.Alert, this.el);
        this.hasHeaderSlotContent = hasSlotContent(FormSlot.Header, this.el);
        this.hasFooterSlotContent = hasSlotContent(FormSlot.Footer, this.el);
    }

    componentDidLoad(): void {
        this.nativeForm = this.el.querySelector('form');
    }

    private checkValidity(form: HTMLFormElement): boolean {
        return form.checkValidity();
    }

    private validateForm = (form: HTMLFormElement): boolean => {
        if (this.disabledValidation || this.checkValidity(form)) {
            this.errors = [];
            return true;
        }
        this.el
            .querySelectorAll('example-field')
            .forEach((field) => field.validateField());
        this.errors = getErrorSummary(form, getErrorMessageTemplates(this));
        return false;
    };

    private resetForm(): void {
        Array.from(
            this.el.querySelectorAll(`.${GlobalCssClass.FormElement}`),
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        ).forEach(async (ele: any) => {
            if (ele.reset && !ele.readonly) await ele.reset();
            if (ele.tagName === 'DIV') {
                const select = ele.querySelector('select');
                if (select) {
                    select.selectedIndex = 0;
                    select.value = '';
                }
            }
        });
        this.errors = [];
        setTimeout(() => {
            Array.from(this.el.getElementsByTagName('example-field')).forEach(
                async (field) => await field.resetField(),
            );
        }, 20);
        this.nativeForm.removeAttribute('aria-invalid');
    }

    private handleValidForm(): void {
        if (this.allowRedirect) {
            this.nativeForm.submit();
        } else {
            this.nativeForm.removeAttribute('aria-invalid');
            this.exampleFormSubmit.emit(serializeForm(this.nativeForm));
            if (!this.disabledClearOnSubmit) this.resetForm();
        }
    }

    private handleInvalidForm(): void {
        this.nativeForm.setAttribute('aria-invalid', 'true');
        const errorSummary: HTMLElement = this.nativeForm.querySelector(
            'div[role="alert"]',
        );
        if (this.hiddenErrorSummary === false && errorSummary !== null) {
            errorSummary.focus();
        } else {
            const firstErrEle = this.nativeForm.querySelector(
                `#${this.errors[0].targetId}`,
            ) as HTMLInputElement;
            if (firstErrEle !== null) {
                // allow time for the field to validate
                setTimeout(() => firstErrEle.focus(), 20);
            }
        }
        this.exampleFormInvalid.emit(this.errors);
    }

    private onSubmit = (evt): void => {
        if (evt && (!this.allowRedirect || !this.disabledValidation)) {
            evt.preventDefault();
        }
        if (!this.disabledValidation) {
            if (this.validateForm(this.nativeForm)) {
                this.handleValidForm();
            } else {
                this.handleInvalidForm();
            }
        } else {
            this.exampleFormSubmit.emit(serializeForm(this.nativeForm));
        }
    };

    render() {
        const formProps = {
            acceptCharset: this.acceptCharset,
            action: this.action,
            autocomplete: this.autocomplete,
            enctype: this.enctype,
            method: this.method,
            name: this.name,
            target: this.target,
        };

        const showErrorSummary =
            this.errors.length &&
            !this.hiddenErrorSummary &&
            !this.disabledValidation;
        const displayAlert = showErrorSummary || this.hasAlertSlotContent;

        return (
            <Host
                class={{
                    [FormCssClass.Base]: true,
                    [FormCssClass.Error]: this.errors.length > 0,
                }}
            >
                <form
                    {...formProps}
                    noValidate
                    onSubmit={this.onSubmit}
                    data-testid={nativeTestid(this.el, 'form')}
                >
                    {this.hasHeaderSlotContent && (
                        <header class={FormCssClass.Header}>
                            <slot name={FormSlot.Header}></slot>
                        </header>
                    )}
                    {displayAlert && (
                        <div
                            role="alert"
                            tabindex="-1"
                            class={{
                                [FormCssClass.Alert]: true,
                            }}
                        >
                            {showErrorSummary ? (
                                'There are errors with the form'
                            ) : null}
                            <slot name={FormSlot.Alert}></slot>
                        </div>
                    )}
                    <slot />
                    {this.hasFooterSlotContent && (
                        <div class={FormCssClass.Footer}>
                            <slot name={FormSlot.Footer} />
                        </div>
                    )}
                </form>
            </Host>
        );
    }
}
