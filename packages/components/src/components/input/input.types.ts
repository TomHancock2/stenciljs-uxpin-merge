export enum InputCssClass {
    Base = 'example-input',
    NativeInput = 'example-input__native-input',
    TextArea = 'example-input--textarea',
    Label = 'example-input__label',
    Watermark = 'example-input--watermark',
    Clearable = 'example-input--clearable',
    Clear = 'example-input__clear',
    Width2 = 'example-input--width-2',
    Width4 = 'example-input--width-4',
    Width6 = 'example-input--width-6',
    Width8 = 'example-input--width-8',
    Width10 = 'example-input--width-10',
    Width12 = 'example-input--width-12',
    Width16 = 'example-input--width-16',
    Width25Perc = 'example-input--width-25-perc',
    Width50Perc = 'example-input--width-50-perc',
    Width75Perc = 'example-input--width-75-perc',
    Focus = 'example-input--focus',
    HiddenLabel = 'example-input--hiddenlabel',
    Error = 'example-input--error',
    Prepend = 'example-input--addon-prepend',
    Append = 'example-input--addon-append',
    InputWrapper = 'example-input__wrapper',
    AddOn = 'example-input__addon',
}

export enum InputSlot {
    Prepend = 'prepend',
    Append = 'append',
}

export type NativeInputElement = HTMLInputElement | HTMLTextAreaElement;

export enum InputMode {
    None = 'none',
    Text = 'text',
    Tel = 'tel',
    Url = 'url',
    Email = 'email',
    Numeric = 'numeric',
    Decimal = 'decimal',
    Search = 'search',
}

export enum InputWidth {
    Two = '2',
    Four = '4',
    Six = '6',
    Eight = '8',
    Ten = '10',
    Twelve = '12',
    Sixteen = '16',
    TwentyFivePercent = '25Perc',
    FiftyPercent = '50Perc',
    SeventyFivePercent = '75Perc',
}

export enum InputVRTState {
    Focus = 'focus',
}
