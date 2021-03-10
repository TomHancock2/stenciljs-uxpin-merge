import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';
import { ExampleColProps } from './ExampleCol.types';
/**
 * @uxpinwrappers
 * NonResizableWrapper
 */
const ExampleCol = (props: ExampleColProps) => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {},
        uxpinRef
    );
    return (
        <example-col {...customElementProps} ref={ref}>
            <div>{children}</div>
        </example-col>
    );
};

export default ExampleCol;
