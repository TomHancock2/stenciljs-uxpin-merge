import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';

import { ExampleInputProps, InputRef } from './ExampleInput.types';
import { uniqueKey } from '../../utils/helpers';

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
        uxpinRef as InputRef,
    );
    return (
        <example-input 
            onExampleInput={onInput} 
            {...customElementProps} 
            ref={ref}
            key={uniqueKey('example-form')}
        >
            {children}
        </example-input>
    );
};

export default ExampleInput;
