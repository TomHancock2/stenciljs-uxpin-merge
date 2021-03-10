import {
    Component,
    ComponentInterface,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Listen,
    Method,
    Prop,
    State,
} from '@stencil/core';

import {
    InputCssClass,
    InputMode,
    InputSlot,
    InputWidth,
    NativeInputElement,
} from './input.types';
import {
    GlobalCssClass,
    InputError,
    InputEventStatus,
    OnOff,
    TextFieldType,
    SelectWidth
} from '../../utils/interfaces';
import { nativeId, nativeTestid } from '../../utils/helpers';

let inputIds = 0;

/**
 * @slot prepend - Section before input to place add-ons
 * @slot append - Section after input to place add-ons
 * @testId input - <input>
 * @testId textarea - <textarea>
 */
@Component({
    scoped: true,
    styleUrl: 'styles/input.css',
    tag: 'example-input',
})
export class Input implements ComponentInterface {
    private nativeInput: NativeInputElement;
    private hasPrependSlot: boolean;
    private hasAppendSlot: boolean;
    private inputId = `example-input-${inputIds++}`;
    private formEl?: HTMLExampleFormElement;
    private fieldEl?: HTMLExampleFieldElement;

    @Element() el!: HTMLExampleInputElement;

    @State() hasFocus = false;
    @State() error: InputError = '';

    /**
     * Indicates whether the value of the control can be automatically completed by the browser.
     */
    @Prop() autocomplete?: OnOff | string = 'off';

    /**
     * Whether auto correction should be enabled when the user is entering/editing the text value.
     */
    @Prop() autocorrect?: OnOff = 'off';

    /**
     * If `true`, then user can clear the value of the input. Will be ignored if `rows` prop is in use.
     */
    @Prop() clearable? = false;

    /**
     * Visually hides the label (if set), label will still be read out by screenreaders
     */
    @Prop() hiddenLabel?: boolean;

    /**
     * A hint to the browser for which keyboard to display.
     * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
     * `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
     */
    @Prop() inputmode?: InputMode;

    /**
     * Label text to be used when there are multiple inputs in one field
     */
    @Prop() multiInputLabel?: string;

    /**
     * The maximum value, which must not be less than its minimum (min attribute) value.
     */
    @Prop() max?: string;

    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
     */
    @Prop() maxlength?: number;

    /**
     * The minimum value, which must not be greater than its maximum (max attribute) value.
     */
    @Prop() min?: string;

    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
     */
    @Prop() minlength?: number;

    /**
     * The name of the control, which is submitted with the form data.
     */
    @Prop() name?: string = this.inputId;

    /**
     * If `true`, the (optional) text is shown in the label.
     * Will be ignored if `required` is set to `true`
     */
    @Prop() optional? = false;

    /**
     * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the `hint` attribute on the field component to give the user extra information about the pattern. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
     */
    @Prop() pattern?: string;

    /**
     * Instructional text that shows before the input has a value.
     */
    @Prop() placeholder?: string | null;

    /**
     * If `true`, the user cannot modify the value.
     */
    @Prop() readonly? = false;

    /**
     * If `true`, the user must fill in a value before submitting a form.
     */
    @Prop() required? = false;

    /**
     * Number of rows in the textarea (when set the component renders a textarea element)
     */
    @Prop() rows?: number = 0;

    /**
     * Works with the min and max attributes to limit the increments at which a value can be set.
     * Possible values are: `"any"` or a positive floating point number.
     */
    @Prop() step?: string;

    /**
     * The type of control to display. The default type is text.
     */
    @Prop() type?: TextFieldType = TextFieldType.Text;

    /**
     * The value of the input.
     */
    @Prop({ mutable: true, reflect: true }) value?: string | null = '';

    /**
     * When set to `true` add ons will render with a different style. Will be ignored if `prepend` or `append` slots are not being used.
     */
    @Prop() watermark? = false;

    /**
     * The width of the input.
     */
    @Prop() width?: InputWidth | SelectWidth;

    /**
     * Sets a role of "combobox" on the HTML input. Only needed for autocomplete controls.
     */
    @Prop() isAutocomplete?: boolean;

    /**
     * Sets the aria-expanded attribute on the HTML input. Only needed for autocomplete controls, and should be dynamically set to true when search results are shown
     */
    @Prop() isExpanded?: boolean = false;

    /**
     * Emitted when an input loads
     */
    @Event() exampleInputDidLoad!: EventEmitter<NativeInputElement>;

    /**
     * Emitted when an input is removed
     */
    @Event() exampleInputDidUnload!: EventEmitter<NativeInputElement>;

    /**
     * Emitted when a keyboard input occurred.
     */
    @Event() exampleInput!: EventEmitter<KeyboardEvent>;

    /**
     * Emitted when the value has changed.
     */
    @Event() exampleChange!: EventEmitter<InputEventStatus>;

    /**
     * Emitted when the input loses focus.
     */
    @Event() exampleBlur!: EventEmitter<InputEventStatus>;

    /**
     * Emitted when the input has focus.
     */
    @Event() exampleFocus!: EventEmitter<InputEventStatus>;

    /**
     * Emitted when the input is manually cleared.
     */
    @Event() exampleClear!: EventEmitter<InputEventStatus>;

    /**
     * Emitted when a keydown event occurs.
     */
    @Event() exampleKeyDown!: EventEmitter<KeyboardEvent>;

    /**
     * Emitted when a keyup event occurs.
     */
    @Event() exampleKeyUp!: EventEmitter<KeyboardEvent>;

    /**
     * Emitted when the inputs error state changes.
     */
    @Event() exampleErrorChange!: EventEmitter<InputEventStatus>;

    // eslint-disable-next-line
    @Listen('keydown')
    handleKeyDown(evt: KeyboardEvent): void {
        this.exampleKeyDown.emit(evt);
    }

    // eslint-disable-next-line
    @Listen('keyup')
    handleKeyUp(evt: KeyboardEvent): void {
        this.exampleKeyUp.emit(evt);
    }

    // eslint-disable-next-line
    @Listen('focus')
    focusHandler(): void {
        this.nativeInput.focus();
    }

    /**
     * Validates the input.
     */
    @Method()
    async validate(): Promise<void> {
        const fieldError = this.fieldEl?.error || '';
        this.updateErrors(this.nativeInput.validationMessage || fieldError);
    }

    /**
     * Resets the input to its original state.
     */
    @Method()
    async reset(): Promise<void> {
        this.error = '';
        this.value = '';
        if (this.rows > 1) this.el.querySelector('textarea').value = '';
    }

    /**
     * Gets the input HTML element.
     */
    @Method()
    getNativeElement(): Promise<NativeInputElement> {
        return Promise.resolve(this.nativeInput);
    }

    componentWillLoad(): void {
        this.hasPrependSlot =
            this.el.querySelector('[slot="prepend"]') !== null;
        this.hasAppendSlot = this.el.querySelector('[slot="append"]') !== null;
    }

    componentDidLoad(): void {
        const ele = this.rows > 1 ? 'textarea' : 'input';
        this.nativeInput = this.el.querySelector(ele);
        this.exampleInputDidLoad.emit(this.nativeInput);
        this.fieldEl = this.el.closest('example-field');
        this.formEl = this.el.closest('example-form');
        if (
            this.fieldEl !== null ||
            (this.formEl !== null && this.readonly === false)
        ) {
            this.registerInput();
        }
    }

    disconnectedCallback(): void {
        if (this.fieldEl !== null) this.unregisterInput();
        this.exampleInputDidUnload.emit(this.nativeInput);
    }

    private async registerInput(): Promise<void> {
        if (this.fieldEl !== null)
            await this.fieldEl.registerInputElement(this.getStatus());
    }

    private async unregisterInput(): Promise<void> {
        await this.fieldEl.unregisterInputElement(this.getStatus());
    }

    private getValue(): string {
        return this.value || '';
    }

    private getStatus = (): InputEventStatus => ({
        value: this.value,
        element: this.nativeInput,
        name: this.name,
        type: this.type,
        required: this.required,
        error: this.error,
        label: this.multiInputLabel,
    });

    private updateErrors(valMsg: string): void {
        if (
            (this.error !== '' && valMsg === '') ||
            (this.error === '' && valMsg !== '')
        ) {
            this.exampleErrorChange.emit(this.getStatus());
        }
        this.error = valMsg;
    }

    private onChange = (): void => {
        this.updateErrors(this.nativeInput.validationMessage || '');
        this.exampleChange.emit(this.getStatus());
    };

    private onInput = (evt: KeyboardEvent): void => {
        console.log('hello');
        const input = evt.target as HTMLInputElement | null;
        if (input !== null) {
            this.value = input.value || '';
        }
        this.exampleInput.emit(evt);
    };

    private onBlur = (): void => {
        this.hasFocus = false;
        this.exampleBlur.emit(this.getStatus());
    };

    private onFocus = (): void => {
        this.hasFocus = true;
        this.exampleFocus.emit(this.getStatus());
    };

    private handleClear = (): void => {
        this.nativeInput.focus();
        this.value = '';
        this.exampleClear.emit(this.getStatus());
    };

    render() {
        const value = this.getValue();
        const commonProps = {
            class: {
                [InputCssClass.NativeInput]: true,
            },
            inputMode: this.inputmode,
            minLength: this.minlength,
            maxLength: this.maxlength,
            name: this.name,
            pattern: this.pattern,
            placeholder: this.placeholder || '',
            readOnly: this.readonly,
            required: this.required,
            onInput: this.readonly === true ? null : this.onInput,
            onBlur: this.onBlur,
            onFocus: this.onFocus,
            onChange: this.onChange,
        };

        const inputProps = {
            autocomplete: this.autocomplete,
            autocorrect: this.autocorrect,
            min: this.min,
            max: this.max,
            step:
                this.step !== undefined && this.type === TextFieldType.Number
                    ? 'any'
                    : this.step,
            type: this.type,
            value,
        };

        const clear =
            this.clearable == true && this.value !== '' && this.rows < 2;

        const addWidthClass = this.width !== undefined && this.rows < 2;
        const widthClass =
            this.width &&
            `${InputCssClass[`Width${this.width}`]} ${
                GlobalCssClass.IgnoreStack
            }`;

        // Accessibility attributes for autocomplete
        let nativeEleId = this.name;
        let autocompleteAttributes;
        if (this.isAutocomplete && this.type === TextFieldType.Text) {
            autocompleteAttributes = {
                role: 'combobox',
                'aria-autocomplete': 'list',
                'aria-expanded': this.isExpanded ? 'true' : 'false',
                'aria-owns': `${nativeEleId}__list`,
            };
            nativeEleId = nativeId(this.el, 'input') || this.name;
        }

        return (
            <Host
                class={{
                    [InputCssClass.Base]: true,
                    [GlobalCssClass.FormElement]: true,
                    [GlobalCssClass.FormElementInvalid]: this.error !== '',
                    [InputCssClass.TextArea]: this.rows > 1,
                    [InputCssClass.Focus]:
                        this.hasFocus ||
                        this.isExpanded,
                    [InputCssClass.HiddenLabel]: this.hiddenLabel,
                    [widthClass]: addWidthClass,
                    [InputCssClass.Prepend]: this.hasPrependSlot,
                    [InputCssClass.Append]:
                        this.hasAppendSlot === true || this.clearable === true,
                    [InputCssClass.Watermark]: this.watermark === true,
                    [InputCssClass.Clearable]:
                        this.clearable === true && this.rows < 2,
                }}
            >
                {this.multiInputLabel && (
                    <example-label
                        class={InputCssClass.Label}
                        for={nativeEleId}
                        labelText={this.multiInputLabel}
                        required={this.required}
                        optional={this.optional}
                    ></example-label>
                )}

                <div class={{ [InputCssClass.InputWrapper]: true }}>
                    {this.hasPrependSlot === true && (
                        <div class={{ [InputCssClass.AddOn]: true }}>
                            <slot name={InputSlot.Prepend} />
                        </div>
                    )}

                    {this.rows > 1 ? (
                        <textarea
                            {...commonProps}
                            rows={this.rows}
                            data-testid={nativeTestid(this.el, 'textarea')}
                            id={nativeEleId}
                        >
                            {value}
                        </textarea>
                    ) : (
                        <input
                            {...commonProps}
                            {...inputProps}
                            {...autocompleteAttributes}
                            data-testid={nativeTestid(this.el, 'input')}
                            id={nativeEleId}
                        />
                    )}

                    {(this.hasAppendSlot === true ||
                        (this.clearable === true && clear == true)) && (
                        <div class={{ [InputCssClass.AddOn]: true }}>
                            <span
                                class={{ [InputCssClass.Clear]: true }}
                                onClick={this.handleClear}
                            />
                            <slot name={InputSlot.Append} />
                        </div>
                    )}
                </div>
            </Host>
        );
    }
}
