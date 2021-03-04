import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';
import { ExampleRowProps } from './ExampleRow.types';

/**
 * @uxpinwrappers
 * NonResizableWrapper
 */
const ExampleRow = (props: ExampleRowProps) => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {},
        uxpinRef
    );
    return (
        <example-row {...customElementProps} ref={ref}>
            {children}
        </example-row>
    );
};

export default ExampleRow;