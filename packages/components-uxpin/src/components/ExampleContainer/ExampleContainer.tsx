import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';
import { ExampleContainerProps } from './ExampleContainer.types';

/**
 * @uxpinwrappers
 * SkipContainerWrapper
 */
const ExampleContainer = (props: ExampleContainerProps) => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {},
        uxpinRef
    );
    return (
        <example-container {...customElementProps} ref={ref}>
            <div>{children}</div>
        </example-container>
    );
};

export default ExampleContainer;
