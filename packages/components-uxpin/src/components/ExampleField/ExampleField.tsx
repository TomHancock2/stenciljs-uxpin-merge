import { FormSlot } from 'components/dist/types/components/form/form.types';
import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';
import { ExampleFieldProps } from './ExampleField.types';

/**
 * @uxpinwrappers
 * SkipContainerWrapper
 */
const ExampleField = (props: ExampleFieldProps) => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {},
        uxpinRef
    );
    return (
        <example-field {...customElementProps} ref={ref}>
            {children}
        </example-field>
    );
};

export default ExampleField;
