import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';
import { ExampleInputProps } from './ExampleInput.types';

/**
 * @uxpinwrappers
 * SkipContainerWrapper
*/
const ExampleInput = (props: ExampleInputProps) => {
    const { children, uxpinRef, onInput, ...otherProps } = props;
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
        <example-input 
            onExampleInput={onInput} 
            {...customElementProps} 
            ref={ref}
        >
            {children}
        </example-input>
    );
};

export default ExampleInput;
