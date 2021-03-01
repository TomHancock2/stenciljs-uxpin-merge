import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCustomElement } from 'react-friendly-custom-elements';

/**
 * @uxpinwrappers
 * SkipContainerWrapper
 */
const ExampleInput = props => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {
            onChange: 'exampleChange',
            onBlur: 'exampleBlur',
            onFocus: 'exampleFocus',
            onInput: 'exampleInput',
            onKeyDown: 'exampleKeyDown',
            onClear: 'exampleClear',
        },
        uxpinRef
    );
    return (
        <example-input {...customElementProps} ref={ref}>
            {children}
        </example-input>
    );
};

const OnOff = ['on', 'off'];

ExampleInput.propTypes = {
    autocomplete: PropTypes.oneOf(OnOff),
    autocorrect: PropTypes.oneOf(OnOff),
    clearable: PropTypes.bool,
    hiddenlabel: PropTypes.bool,
    inputmode: PropTypes.oneOf([
        'none',
        'text',
        'tel',
        'url',
        'email',
        'numeric',
        'decimal',
        'search',
    ]),
    multiinputlabel: PropTypes.string,
    max: PropTypes.string,
    maxlength: PropTypes.number,
    min: PropTypes.string,
    minlength: PropTypes.number,
    name: PropTypes.string,
    optional: PropTypes.bool,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    readonly: PropTypes.bool,
    required: PropTypes.bool,
    rows: PropTypes.number,
    step: PropTypes.string,
    type: PropTypes.oneOf([
        'date',
        'email',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'url',
        'time',
    ]),
    value: PropTypes.string,
    watermark: PropTypes.bool,
    width: PropTypes.oneOf(['2', '3', '4', '5', '6', '7', '8', '9', '10']),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onInput: PropTypes.func,
    onKeyDown: PropTypes.func,
    onClear: PropTypes.func,
};

export { ExampleInput as default };
